export type TitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  onChange?: (newProps: TitlePropsType) => void
}

export const TitleDefaultProps: TitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
