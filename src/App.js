import React, { useCallback } from 'react'

import { useQueryClient } from 'react-query'
import styled from 'styled-components/macro'

import Alert from 'src/components/Alert'
import Container from 'src/components/Container'
import Form from 'src/components/Form'
import Loading from 'src/components/Loading'
import TodoList from 'src/components/TodoList'
import { qKeyTodo, qKeyTodoList } from 'src/constants'
import useCompleteTodoMutation from 'src/data/mutations/useCompleteTodoMutation'
import useCreateTodoMutation from 'src/data/mutations/useCreateTodoMutation'
import useRemoveTodoMutation from 'src/data/mutations/useRemoveTodoMutation'
import useTodosQuery from 'src/data/queries/useTodosQuery'

function App() {
  const queryClient = useQueryClient()
  const { remove } = useRemoveTodoMutation()
  const { create } = useCreateTodoMutation()
  const { complete } = useCompleteTodoMutation()

  const { data, isError, isLoading } = useTodosQuery()
  const { todoIdList = [] } = data || {}

  const toggleCompleteFirstTask = useCallback(() => {
    const cacheData = queryClient.getQueryData(qKeyTodoList()) || {}
    const firstTodo = cacheData?.todoIdList[0]

    if (!firstTodo) return

    queryClient.setQueryData(qKeyTodo(1), (_data) => ({
      ..._data,
      isComplete: !_data?.isComplete,
    }))
  }, [queryClient])

  return (
    <Container>
      {isError && <Alert />}

      {isLoading && <Loading />}

      <TodoList todoIdList={todoIdList} remove={remove} complete={complete} />

      <Form key="Form-query" create={create} />

      <ButtonToggleComplete
        onClick={toggleCompleteFirstTask}
        type="button"
        value="Toggle Complete first task"
      />
    </Container>
  )
}

export default App

const ButtonToggleComplete = styled.input`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  justify-content: center;
  padding: 1rem;
  border-radius: 20rem;
  background-color: #f9fafbff;
  box-shadow: -1px 7px 9px -5px rgba(0, 0, 0, 0.37);
  color: #6b7280ff;
  border: none;

  :focus {
    outline: none;
  }
  :hover {
    background-color: #f87171ff;
  }
`
