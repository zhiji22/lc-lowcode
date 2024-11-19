import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获取下一个 selectedId
 * @param fe_id 当前的 id
 * @param componentList 组件列表
 */
// 重新计算 selectedId
export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  const index = componentList.findIndex((c) => c.fe_id === fe_id)
  if (index < 0) return ''

  let newSelectedId = ''
  const length = componentList.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      newSelectedId = componentList[index - 1].fe_id
    } else {
      newSelectedId = componentList[index + 1].fe_id
    }
  }

  return newSelectedId
}
