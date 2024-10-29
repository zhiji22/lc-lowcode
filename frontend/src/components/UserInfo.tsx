import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const Logo: FC = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  // 从redux获取信息
  const { username, nickname } = useGetUserInfo()

  const handleLogout = () => {
    dispatch(logoutReducer())
    // 清楚token
    removeToken()
    message.success('退出成功！')
    nav(LOGIN_PATHNAME)
  }

  // 有用户信息
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={handleLogout}>
        退出
      </Button>
    </>
  )

  // 无用户信息
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default Logo
