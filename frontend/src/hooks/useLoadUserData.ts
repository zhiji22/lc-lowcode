import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)

  // 请求用户信息
  const { run: getUserInfo } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      // 存储在store中
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 判断是否已经有数据
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      // redux store已经存在用户信息
      setWaitingUserData(false)
      return
    }

    getUserInfo()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
