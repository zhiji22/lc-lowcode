import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import {
  SEARCH_KEYWORD,
  PAGE_INDEX,
  PAGE_SIZE,
  INIT_PAGE_SIZE,
} from '../constant'
import { getQuestionList } from '../services/question'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

// 获取list 伴随搜索
function useLoadQuestionList(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      // 搜索关键词
      const keyword = searchParams.get(SEARCH_KEYWORD) || ''
      // 当前页数
      const pageIndex = parseInt(searchParams.get(PAGE_INDEX) || '') || 1
      // 一页多少条数据
      const pageSize =
        parseInt(searchParams.get(PAGE_SIZE) || '') || INIT_PAGE_SIZE
      // 根据搜索关键词 获取列表
      const data = await getQuestionList({
        keyword,
        isStar,
        isDeleted,
        pageIndex,
        pageSize,
      })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionList
