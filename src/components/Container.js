import React from 'react'

import styled from 'styled-components/macro'

function Container({ children }) {
  return (
    <DivRoot>
      <DivChildren>{children}</DivChildren>
    </DivRoot>
  )
}

export default Container

const DivRoot = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
`

const DivChildren = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
`
