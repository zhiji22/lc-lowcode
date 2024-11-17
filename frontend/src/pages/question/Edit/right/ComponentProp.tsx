import { FC } from 'react'
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo'
import {
  getComponentConfByType,
  ComponentPropsType,
} from '../../../../components/question'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../../store/componentsReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  const { type, props } = selectedComponent
  const ComponentConf = getComponentConfByType(type)
  if (ComponentConf == null) return <NoProp />

  const { PropComponent } = ComponentConf

  const dispatch = useDispatch()

  const handleChange = (newProps: ComponentPropsType) => {
    if (selectedComponent == null) return

    const { fe_id } = selectedComponent

    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={handleChange} />
}

export default ComponentProp
