import { useQuery } from 'react-query'

import { qKeyTodo } from 'src/constants'

const useTodoQuery = (id) => {
  const { data } = useQuery(qKeyTodo(id), () => {})

  return {
    data,
  }
}

export default useTodoQuery
