import { FC, useEffect, useState } from 'react'
import { INIT_PAGE_SIZE, PAGE_INDEX, PAGE_SIZE } from '../constant'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

import { Pagination } from 'antd'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  // 分页中当前页
  const [current, setCurrent] = useState(1)
  // 一页有多少条
  const [pageSize, setPageSize] = useState(INIT_PAGE_SIZE)

  const [searchParams] = useSearchParams()

  // 当url发生变化时 改变 页数
  useEffect(() => {
    // url有可能输入了 pageIndex = 3 4...
    const pageIndex = parseInt(searchParams.get(PAGE_INDEX) || '') || 1
    const pageSize =
      parseInt(searchParams.get(PAGE_SIZE) || '') || INIT_PAGE_SIZE

    // 更新当前页数和 条数
    setCurrent(pageIndex)
    setPageSize(pageSize)
  }, [])

  const nav = useNavigate()
  const { pathname } = useLocation()
  // 点击分页
  const handlePageChange = (page: number, pageSize: number) => {
    // 更新点击的分页index 和 size
    searchParams.set(PAGE_INDEX, page.toString())
    searchParams.set(PAGE_SIZE, pageSize.toString())

    nav({
      pathname,
      search: searchParams.toString(),
    })
    setCurrent(page)
    setPageSize(pageSize)
  }

  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={handlePageChange}
    />
  )
}

export default ListPage
