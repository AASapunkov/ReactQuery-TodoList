import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

import { qKeyTodo, qKeyTodoList, URL } from 'src/constants'

const useTodosQuery = () => {
  const queryClient = useQueryClient()

  const { data, isError, isLoading } = useQuery(qKeyTodoList(), () =>
    axios.get(`${URL}/todos`).then((res) => {
      const todoIdList = res.data.map((todoData) => {
        const todoId = todoData.id

        queryClient.setQueryData(qKeyTodo(todoId), todoData)

        return todoId
      })

      return { todoIdList }
    }),
  )

  return { data, isError, isLoading }
}

export default useTodosQuery
