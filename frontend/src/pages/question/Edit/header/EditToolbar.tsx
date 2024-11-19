import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent } from '../../../../store/componentsReducer'

const EditToolbar: FC = ({}) => {
  const dispatch = useDispatch()

  return (
    <Space>
      <Tooltip>
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => dispatch(removeSelectedComponent())}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
