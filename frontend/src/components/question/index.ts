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
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 组件全部列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

//根据type找到对应组件
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
