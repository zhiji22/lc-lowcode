import React, { FC, useCallback } from 'react'
import classNames from 'classnames'
import QuestionTitle from '../../../components/question/Title/Component'
import QuestionInput from '../../../components/question/Input/Component'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/question'
import { ComponentInfoType } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import styles from './EditCanvas.module.scss'

type PropsType = {
  loading: boolean
}

// 找到对应组件并展示
function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  console.log('网络的type===', type)

  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return

  const { Component } = componentConf

  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  const handleClick = useCallback(
    (id: string) => {
      dispatch(changeSelectedId(id))
    },
    [dispatch]
  )
  // 判断是否在加载
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c

        // 拼接class
        const wrapperDefaultClassName = styles['component-wrapper']
        const selectedClassName = styles.selected
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: selectedId == fe_id,
        })

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={() => handleClick(fe_id)}
          >
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
