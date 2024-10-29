import { FC, useState } from 'react'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import Pagination from '../../components/ListPage'
import { useRequest } from 'ahooks'
import styles from './common.module.scss'
import { Spin } from 'antd'
import { Empty, Space, Table, Tag, Button, Modal, message } from 'antd'
import ListSearch from '../../components/ListSearch'
import { deleteQuestions, updateQuestion } from '../../services/question'

const { confirm } = Modal

const Trash: FC = () => {
  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionList({ isDeleted: true })
  const { list = [], total = 0 } = data
  // 表格选中的id
  const [selectIds, setSelectIds] = useState<string[]>([])

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectIds) {
        await updateQuestion(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 800,
      onSuccess() {
        message.success('恢复成功！')
        // 重新刷新
        refresh()
        setSelectIds([])
      },
    }
  )

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestions(selectIds)
    },
    {
      manual: true,
      onSuccess() {
        message.success(`已删除 ${selectIds}`)
        refresh()
        setSelectIds([])
      },
    }
  )

  // 表格的删除
  function handleDelete() {
    confirm({
      title: '确认删除？',
      content: '删除后不可恢复',
      onOk: deleteQuestion,
    })
  }

  const tableColumn = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="success">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        )
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]
  // 展示的表格jsx
  const TableElement = (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Space>
          <Button type="primary" disabled={!selectIds.length} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={!selectIds.length} onClick={handleDelete}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumn}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) =>
            setSelectIds(selectedRowKeys as string[]),
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>回收站</h3>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center', margin: '30px' }}>
            <Spin size="large" />
          </div>
        )}
        {!loading && !list.length && <Empty description="暂无数据" />}
        {!loading && list.length && TableElement}
      </div>
      <div className={styles.footer}>
        <Pagination total={total} />
      </div>
    </>
  )
}

export default Trash
