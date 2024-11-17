export type InputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: InputPropsType) => void
}

export const InputDefaultProps: InputPropsType = {
  title: '输入框标题',
  placeholder: '请输入',
}
