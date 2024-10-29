import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { InputPropsType, InputDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<InputPropsType> = (props: InputPropsType) => {
  const { title, placeholder } = { ...InputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default QuestionInput
