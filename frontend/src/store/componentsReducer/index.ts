import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/question'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

// 初始值
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
}
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload
    },

    // 修改selectedId
    changeSelectedId: (
      state: ComponentsStateType,
      action: PayloadAction<string>
    ) => {
      state.selectedId = action.payload
    },

    // 添加新组件到画布中
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>
    ) => {
      const newComponent = action.payload

      const { selectedId, componentList } = state
      // 选中组件时，插入选中组件下面；未选中则push
      const index = componentList.findIndex((c) => c.fe_id === selectedId)

      // 当前没有选中组件
      if (index < 0) {
        state.componentList.push(newComponent)
      } else {
        state.componentList.splice(index + 1, 0, newComponent)
      }

      state.selectedId = newComponent.fe_id
    },

    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload

      // 找到当前的组件
      const component = state.componentList.find((c) => c.fe_id === fe_id)
      if (component) {
        component.props = { ...component.props, ...newProps }
      }
    },

    // 删除选中组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state

      const newSelectedId = getNextSelectedId(selectedId, componentList)
      state.selectedId = newSelectedId

      const index = componentList.findIndex((c) => c.fe_id === selectedId)
      if (index >= 0) {
        componentList.splice(index, 1)
      }
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
