import { FC, useEffect } from 'react'
import { InputPropsType } from './interface'
import { Form, Input, message } from 'antd'

const PropComponent: FC<InputPropsType> = (props: InputPropsType) => {
  const { title, placeholder, onChange } = props
  console.log(props)
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder,
    })
  }, [title, placeholder])

  const handleChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
