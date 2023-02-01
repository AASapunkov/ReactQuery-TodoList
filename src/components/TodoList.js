import React, { memo } from 'react'

import styled from 'styled-components/macro'

import TodoItem from 'src/components/TodoItem'

function TodoList({ todoIdList, complete, remove }) {
  return (
    <List>
      {todoIdList.map((id) => (
        <TodoItem key={id} id={id} complete={complete} remove={remove} />
      ))}
    </List>
  )
}

export default memo(TodoList)

const List = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
`
