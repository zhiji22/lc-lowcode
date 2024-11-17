import React, { FC } from 'react'
import { Typography } from 'antd'
import { TitlePropsType, TitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<TitlePropsType> = (props: TitlePropsType) => {
  const { text, level = 1, isCenter } = { ...TitleDefaultProps, ...props }

  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
