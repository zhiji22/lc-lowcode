import { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import Pagination from '../../components/ListPage'
import styles from './common.module.scss'
import { Empty, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionList({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>星标问卷</h3>
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
        {!loading &&
          list.length &&
          list.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <Pagination total={total} />
      </div>
    </>
  )
}

export default Star
