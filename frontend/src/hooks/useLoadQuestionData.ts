import { useParams } from 'react-router-dom'
import { getQuestionById } from '../services/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // ajax 请求数据
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')

      const data = getQuestionById(id)
      return data
    },
    {
      manual: true,
    }
  )
  // 根据id变化 获取数据
  useEffect(() => {
    run(id)
  }, [id])

  // 根据获取的data 设置到redux中
  useEffect(() => {
    if (!data) return

    const { title = '', componentList = [] } = data

    // 默认选中第一个组件 selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].selectedId
    }

    // 存储到redux中
    dispatch(resetComponents({ componentList, selectedId: '' }))
  }, [data])

  return { loading, error }
}

export default useLoadQuestionData
