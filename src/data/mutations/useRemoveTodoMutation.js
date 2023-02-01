import { useCallback } from 'react'

import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { qKeyTodo, qKeyTodoList, URL } from 'src/constants'

const useRemoveTodoMutation = () => {
  const queryClient = useQueryClient()

  const removeMut = useCallback(
    async (id) => {
      // eslint-disable-next-line no-useless-catch
      try {
        return axios.delete(`${URL}/todos/${id}`).then((res) => {
          queryClient.setQueryData(qKeyTodoList(), (cacheData) => {
            const { todoIdList = [] } = cacheData || {}

            queryClient.removeQueries(qKeyTodo(id))

            return {
              todoIdList: todoIdList.filter((_id) => _id !== id),
            }
          })

          return res.data
        })
      } catch (err) {
        throw err
      }
    },
    [queryClient],
  )

  const {
    mutateAsync: remove,
    isLoading,
    error,
  } = useMutation(removeMut, {
    // onSuccess: () => queryClient.invalidateQueries(qKeyTodoList()),
  })

  return {
    remove,
    errorRemove: error,
    isRemoving: isLoading,
  }
}

export default useRemoveTodoMutation
