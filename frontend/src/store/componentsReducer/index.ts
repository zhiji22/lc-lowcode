import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/question'
import produce from 'immer'

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
  },
})

export const { resetComponents, changeSelectedId, addComponent } =
  componentsSlice.actions

export default componentsSlice.reducer
