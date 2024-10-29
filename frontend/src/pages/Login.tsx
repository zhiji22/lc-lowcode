import { FC, useEffect } from 'react'
import { Space, Typography, Form, Input, Checkbox, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Login.module.scss'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { setToken } from '../utils/user'

const { Title } = Typography

const USERNAME = 'username'
const PASSWORD = 'password'
// 记住我
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME, username)
  localStorage.setItem(PASSWORD, password)
}

// 删除记住用户 的数据
function deleteUser() {
  localStorage.removeItem(USERNAME)
  localStorage.removeItem(PASSWORD)
}

// 获取记住我 的用户信息
function getUserInfo() {
  return {
    username: localStorage.getItem(USERNAME),
    password: localStorage.getItem(PASSWORD),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()
  useEffect(() => {
    const { username, password } = getUserInfo()
    form.setFieldsValue({ username, password })
  }, [])

  // 确认登录后发送请求
  const { run: handleLogin } = useRequest(
    async (username: string, password: string) => {
      const data = loginService(username, password)
      console.log(data)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        // 存储token
        setToken(token)
        message.success('登录成功!')
        // 导航到列表页
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  // 登录
  const onFinish = (values: any) => {
    const { username, password, remember } = values

    // 登录 发送请求
    handleLogin(username, password)

    // 记住我
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUser()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在 5-20 之间',
              },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input placeholder="用户名" autoComplete="username" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              placeholder="密码"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
