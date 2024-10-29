import { FC } from 'react'
import QuestionInputConf, { InputPropsType } from './Input'
import QuestionTitleConf, { TitlePropsType } from './Title'

// 各个组件的 prop type
export type ComponentPropsType = InputPropsType & TitlePropsType

// 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 组件全部列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
]

//根据type找到对应组件
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
