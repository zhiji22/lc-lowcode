import { FC, useEffect, useRef, useState, useMemo } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { SEARCH_KEYWORD, INIT_PAGE_SIZE } from '../../constant'
import { Empty, Spin } from 'antd'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'
import { getQuestionList } from '../../services/question'

const List: FC = () => {
  // 是否开始加载数据
  const [started, setStarted] = useState(false)
  // 记录下拉加载 多少次
  const [pageIndex, setPageIndex] = useState(1)
  // 数据
  const [list, setList] = useState([])
  // 数据总数
  const [total, setTotal] = useState(0)
  // 是否还有更多数据
  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(SEARCH_KEYWORD) || ''

  const containerRef = useRef<HTMLDivElement>(null)

  // 当url发生变化时 重置数据
  useEffect(() => {
    setStarted(false)
    setPageIndex(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // 获取数据
  const { run: loadData, loading } = useRequest(
    async () => {
      const data = await getQuestionList({
        pageIndex,
        pageSize: INIT_PAGE_SIZE,
        keyword: searchParams.get(SEARCH_KEYWORD) || '',
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        // 下拉一次 加一
        setPageIndex(pageIndex + 1)
      },
    }
  )

  // 下拉 防抖
  const { run: loadMoreData } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (!ele) return

      // 获取元素距离可视区 距离
      const domRect = ele.getBoundingClientRect()
      if (!domRect) return
      const { bottom } = domRect
      // 如果小于 说明已下拉
      if (bottom <= document.body.clientHeight) {
        loadData()
        setStarted(true)
      }
    },
    { wait: 1000 }
  )

  // 监听下拉记载数据
  useEffect(() => {
    // 当页面url发生变化 加载数据
    loadMoreData()

    // 判断是否有更多数据
    if (haveMoreData) {
      window.addEventListener('scroll', loadMoreData)
    }
    // 取消绑定
    return () => {
      window.removeEventListener('scroll', loadMoreData)
    }
  }, [searchParams, haveMoreData])

  // 加载更多 函数
  const LoadMoreContent = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty />

    //是否有更多
    if (!haveMoreData) return <span>没有更多了...</span>

    return <span>用力加载中......</span>
  }, [started, loading, haveMoreData])

  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* {loading && (
          <div style={{ textAlign: 'center', margin: '30px' }}>
            <Spin size="large" />
          </div>
        )} */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContent}</div>
      </div>
    </>
  )
}

export default List
