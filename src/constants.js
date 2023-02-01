export const URL = 'http://localhost:3030'

export const QUERY_KEY = {
  TODO_LIST: 'Todo List',
  TODO: 'Todo',
}

export const qKeyTodoList = () => [QUERY_KEY.TODO_LIST]

export const qKeyTodo = (_id) => [QUERY_KEY.TODO, _id]
