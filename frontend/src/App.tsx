import { useEffect, useState } from 'react'
import type { components as apiSchema } from './api/schema'
import { client } from './api/client'
import './App.css'

type TodoResponse = apiSchema['schemas']['TodoResponse']

function App() {
  const [todos, setTodos] = useState<TodoResponse[]>([])

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

  return (
    <div className="app">
      <h1>FastAPI React Todo</h1>
      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span>{todo.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
