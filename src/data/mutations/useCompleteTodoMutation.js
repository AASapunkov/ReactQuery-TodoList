import { useCallback } from 'react'

import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { qKeyTodo, URL } from 'src/constants'

const useCompleteTodoMutation = () => {
  const queryClient = useQueryClient()

  const completeMut = useCallback(
    async (data) => {
      if (data?.isComplete) return

      // eslint-disable-next-line no-useless-catch
      try {
        return axios
          .patch(`${URL}/todos/${data.id}`, { ...data, isComplete: true })
          .then((res) => {
            queryClient.setQueryData(qKeyTodo(data.id), (cacheData) => ({
              ...cacheData,
              isComplete: true,
            }))

            return res.data
          })
      } catch (err) {
        throw err
      }
    },
    [queryClient],
  )

  const {
    mutateAsync: complete,
    isLoading,
    error,
  } = useMutation(completeMut, {
    // onSuccess: () => queryClient.invalidateQueries(qKeyTodoList()),
  })

  return {
    complete,
    errorComplete: error,
    isCompleting: isLoading,
  }
}

export default useCompleteTodoMutation
