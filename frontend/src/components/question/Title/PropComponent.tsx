import { FC, useEffect } from 'react'
import { TitlePropsType } from './interface'
import { Form, Input, Select, Checkbox } from 'antd'

const PropComponent: FC<TitlePropsType> = (props: TitlePropsType) => {
  const { text, level, isCenter, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    })
  }, [text, level, isCenter])

  const handleChange = () => {
    if (onChange) {
      const values = form.getFieldsValue()
      onChange(values)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleChange}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
