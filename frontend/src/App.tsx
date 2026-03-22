import { useEffect, useState } from 'react'
import type { components as apiSchema } from './api/schema'
import { client } from './api/client'
import './App.css'

type TodoResponse = apiSchema['schemas']['TodoResponse']

function App() {
  const [todos, setTodos] = useState<TodoResponse[]>([])
  const [newTodoName, setNewTodoName] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await client.GET('/api/todos/')
      if (error) {
        console.error('Failed to fetch todos:', error)
        return
      }
      if (data) {
        setTodos(data)
      }
    }
    fetchTodos()
  }, [])

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = newTodoName.trim()
    if (!trimmed) return
    const { data, error } = await client.POST('/api/todos/', {
      body: { name: trimmed },
    })
    if (error) {
      console.error('Failed to create todo:', error)
      return
    }
    if (data) {
      setTodos([data, ...todos])
      setNewTodoName('')
    }
  }

  const handleToggle = async (todo: TodoResponse) => {
    const { data, error } = await client.PATCH('/api/todos/{todo_id}', {
      params: { path: { todo_id: todo.id } },
      body: { completed: !todo.completed },
    })
    if (error) {
      console.error('Failed to update todo:', error)
      return
    }
    if (data) {
      setTodos(todos.map((t) => (t.id === data.id ? data : t)))
    }
  }

  const handleDelete = async (todoId: number) => {
    const { error } = await client.DELETE('/api/todos/{todo_id}', {
      params: { path: { todo_id: todoId } },
    })
    if (error) {
      console.error('Failed to delete todo:', error)
      return
    }
    setTodos(todos.filter((t) => t.id !== todoId))
  }

  return (
    <div className="app">
      <h1>FastAPI React Todo</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>
      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                />
                <span>{todo.name}</span>
              </label>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
