import { FC, useState } from 'react'
import { updateQuestion } from '../services/question'
import { useRequest } from 'ahooks'
import { duplicateQuestion } from '../services/question'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Modal, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarFilled,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props
  // 是否标星
  const [isStared, setIsStared] = useState(isStar)

  //标星后更新数据
  const { run: handleChangeStar, loading: starLoading } = useRequest(
    async () => {
      await updateQuestion(_id, {
        isStar: !isStared,
      })
    },
    {
      manual: true,
      onSuccess() {
        setIsStared(!isStared)
        message.success('已更新')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: handleDuplicate } = useRequest(
    async () => {
      const data = await duplicateQuestion(_id)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功！')
        nav(`/question/edit/${res.id}`)
      },
    }
  )

  // 删除
  const [isDeleted, setIsDeleted] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      const data = updateQuestion(_id, { isDeleted: true })
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功！')
        setIsDeleted(true)
      },
    }
  )
  // 已经删除了 不在渲染
  if (isDeleted) return null

  const handleDelete = () => {
    confirm({
      title: '确定要删除吗？',
      onOk: deleteQuestion,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStared && <StarFilled style={{ color: 'red' }} />} {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="success">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarFilled />}
              size="small"
              disabled={starLoading}
              onClick={handleChangeStar}
            >
              {isStared ? '取消标星' : '标星'}
            </Button>
            <Button
              type="text"
              icon={<CopyOutlined />}
              size="small"
              disabled={duplicateLoading}
              onClick={handleDuplicate}
            >
              复制
            </Button>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              disabled={deleteLoading}
              onClick={handleDelete}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
