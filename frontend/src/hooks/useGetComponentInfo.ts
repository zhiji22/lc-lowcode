import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

// 从redux中获取组件信息
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components
  ) as ComponentsStateType
  const { componentList = [], selectedId } = components

  return { componentList, selectedId }
}

export default useGetComponentInfo
