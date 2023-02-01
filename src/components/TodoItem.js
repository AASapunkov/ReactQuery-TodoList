import React, { memo, useCallback, useState } from 'react'

import styled from 'styled-components/macro'

import useTodoQuery from 'src/data/queries/useTodoQuery'

function DeleteIcon() {
  return (
    <svg
      width="1rem"
      height="1rem"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}

function UpdateIcon() {
  return (
    <svg
      width="1rem"
      height="1rem"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  )
}

function TodoItem({ id, remove, complete }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const { data } = useTodoQuery(id)
  const { isComplete = false, content = '' } = data || {}

  const mouseEnter = useCallback(() => {
    setIsMenuVisible(true)
  }, [])

  const mouseLeave = useCallback(() => {
    setIsMenuVisible(false)
  }, [])

  return (
    <Todo onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <ContentBox>
        <Content onClick={() => complete(data)} isComplete={isComplete}>
          {content}
        </Content>
      </ContentBox>

      <MenuBox isMenuVisible={isMenuVisible}>
        {isComplete && (
          <ButtonUpdate
          // onClick={update}
          >
            <UpdateIcon />
          </ButtonUpdate>
        )}

        <ButtonRemove onClick={() => remove(id)}>
          <DeleteIcon />
        </ButtonRemove>
      </MenuBox>
    </Todo>
  )
}

export default memo(TodoItem)

const Todo = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
`

const ContentBox = styled.div`
  display: flex;
  padding: 1.5rem;
  border-radius: 20rem;
  background-color: #f9fafbff;
  box-shadow: -1px 7px 9px -5px rgba(0, 0, 0, 0.37);
`

const Content = styled.p`
  text-decoration: ${({ isComplete }) => isComplete && 'line-through'};
  letter-spacing: 0.025em;
  color: #6b7280ff;
`

const MenuBox = styled.div`
  opacity: ${({ isMenuVisible }) => (isMenuVisible ? 1 : 0)};
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`

const ButtonUpdate = styled.button`
  position: absolute;
  bottom: 15px;
  left: -35px;
  height: 1.7rem;
  width: 1.7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6366f1ff;
  color: #fff;
  border: none;

  :focus {
    outline: none;
  }
  :hover {
    background-color: #818cf8ff;
  }
`

const ButtonRemove = styled.button`
  position: absolute;
  bottom: 15px;
  right: -35px;
  height: 1.7rem;
  width: 1.7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ef4444ff;
  color: #fff;
  border: none;

  :focus {
    outline: none;
  }
  :hover {
    background-color: #f87171ff;
  }
`
