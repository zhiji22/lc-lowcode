import { FC } from 'react'
import { Typography } from 'antd'
import {
  componentConfGroup,
  ComponentConfType,
} from '../../../../components/question'
import styles from './ComponentLib.module.scss'
import { addComponent } from '../../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

function generateComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  const handleAddComponent = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleAddComponent}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : 0 }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => generateComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
