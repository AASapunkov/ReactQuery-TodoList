import React from 'react'

import { useForm } from 'react-hook-form'
import styled from 'styled-components/macro'

function PlusIcon() {
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
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  )
}

function Form({ create }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm()

  const onSubmit = (data) => {
    if (errors?.content) return

    create(data)
    reset()
  }
  return (
    <FormRoot onSubmit={handleSubmit(onSubmit)}>
      <InputText
        type="text"
        isError={!!errors?.content}
        {...register('content', {
          required: true,
        })}
        defaultValue=""
        placeholder="Write a new task"
      />

      <ButtonAdd>
        <PlusIcon />
      </ButtonAdd>
    </FormRoot>
  )
}

export default Form

const FormRoot = styled.form`
  position: relative;
  margin-top: 2rem;
`

const InputText = styled.input`
  display: flex;
  width: 100%;
  padding: 1.4rem;
  border-radius: 20rem;
  background-color: #ffffff;
  box-shadow: -1px 7px 9px -5px rgba(0, 0, 0, 0.37);
  border: ${({ isError }) =>
    `1px solid ${isError ? '#ef4444ff' : '#6b7280ff'}`};
  cursor: pointer;

  :focus {
    outline: none;
    border-color: #6366f1ff;
    box-shadow: 0px 0px 0px 1px #6366f1ff;
  }
  :hover {
    border-color: #6366f1ff;
    box-shadow: 0px 0px 0px 1px #6366f1ff;
  }
`
const ButtonAdd = styled.button`
  position: absolute;
  top: 15px;
  right: 10px;
  height: 2rem;
  width: 2rem;
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
