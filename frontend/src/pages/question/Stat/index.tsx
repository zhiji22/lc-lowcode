import { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()

  return (
    <div>
      <p>Stat page</p>
      {/* {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>} */}
    </div>
  )
}

export default Stat
