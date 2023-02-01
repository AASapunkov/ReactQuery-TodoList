import React, { createContext, useContext, useMemo } from 'react'

import useCompleteTodoMutation from '../mutations/useCompleteTodoMutation'
import useCreateTodoMutation from '../mutations/useCreateTodoMutation'
import useRemoveTodoMutation from '../mutations/useRemoveTodoMutation'

const AppContext = createContext({})

export const useApp = () => useContext(AppContext)

export function AppProvider({ children }) {
  const { remove, errorRemove, isRemoving } = useRemoveTodoMutation()
  const { create, errorCreate, isCreating } = useCreateTodoMutation()
  const { complete, errorComplete, isCompleting } = useCompleteTodoMutation()

  const value = useMemo(
    () => ({
      remove,
      errorRemove,
      isRemoving,
      create,
      errorCreate,
      isCreating,
      complete,
      errorComplete,
      isCompleting,
    }),
    [
      create,
      errorCreate,
      errorRemove,
      isCreating,
      isRemoving,
      remove,
      complete,
      errorComplete,
      isCompleting,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
