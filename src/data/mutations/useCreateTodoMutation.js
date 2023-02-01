import { useCallback } from 'react'

import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { qKeyTodo, qKeyTodoList, URL } from 'src/constants'

const useCreateTodoMutation = () => {
  const queryClient = useQueryClient()

  const createMut = useCallback(
    async (data) => {
      // eslint-disable-next-line no-useless-catch
      try {
        return axios.post(`${URL}/todos`, data).then((res) => {
          const newTodo = res.data
          const newTodoId = newTodo.id

          queryClient.setQueryData(qKeyTodoList(), (cacheData) => {
            const { todoIdList = [] } = cacheData || {}

            queryClient.setQueryData(qKeyTodo(newTodoId), newTodo)

            return { todoIdList: [...todoIdList, newTodoId] }
          })

          return newTodo
        })
      } catch (err) {
        throw err
      }
    },
    [queryClient],
  )

  const {
    mutateAsync: create,
    isLoading,
    error,
  } = useMutation(createMut, {
    // onSuccess: () => queryClient.invalidateQueries(qKeyTodoList()),
  })

  return {
    create,
    errorCreate: error,
    isCreating: isLoading,
  }
}

export default useCreateTodoMutation
