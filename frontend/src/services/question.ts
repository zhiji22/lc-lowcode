import axios, { ResDataType } from './index'

type searchParams = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  pageIndex: number
  pageSize: number
}

// 根据id获取
export async function getQuestionById(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = await axios.get(url)

  return data
}

// mainLayout 新建
export async function createQuestion(): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.post(url)

  return data
}

// 获取列表
export async function getQuestionList(
  opt: Partial<searchParams> = {}
): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.get(url, { params: opt })

  return data
}

// 部分 更新数据
export async function updateQuestion(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = await axios.patch(url, opt)

  return data
}

// 复制
export async function duplicateQuestion(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = await axios.post(url)

  return data
}

// 批量删除
export async function deleteQuestions(ids: string[]): Promise<ResDataType> {
  const url = `/api/question`
  const data = await axios.delete(url, { data: { ids } })

  return data
}
