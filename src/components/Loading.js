import React from 'react'

import styled, { keyframes } from 'styled-components/macro'

function RefreshIcon() {
  return (
    <svg
      width="2rem"
      height="2rem"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}

function Loading() {
  return (
    <DivRoot>
      <RefreshIcon />
    </DivRoot>
  )
}

export default Loading

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const DivRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #818cf8ff;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
`
