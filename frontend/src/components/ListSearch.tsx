import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { SEARCH_KEYWORD } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  // 搜索的值
  const [value, setValue] = useState('')
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // 页面刷新时，将参数添加到 input 中
    const currentValue = searchParams.get(SEARCH_KEYWORD) || ''
    setValue(currentValue)
  }, [searchParams])

  // 更新搜索值
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  // 跳转时添加参数
  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${SEARCH_KEYWORD}=${value}`,
    })
  }

  return (
    <>
      <Search
        style={{ width: '270px' }}
        allowClear
        size="middle"
        placeholder="搜索"
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
      />
    </>
  )
}

export default ListSearch
