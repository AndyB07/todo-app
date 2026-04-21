import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:3000/api/todos";

// Add axios interceptor to include auth token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(`${API_URL}`);
      setIsLoading(false);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const loadTodos = async () => {
      await fetchTodos();
    };
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;
    try {
      await axios.post(`${API_URL}`, { title });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error('Add todo error:', error);
      alert('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Delete todo error:', error);
      alert('Failed to delete todo');
    }
  }

  const deleteAllTodos = async () => {
    try {
      await axios.delete(`${API_URL}`);
      fetchTodos();
    } catch (error) {
      console.error('Delete all todos error:', error);
      alert('Failed to delete all todos');
    }
  }

  const toggleTodoCompleted = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/toggle`);
      fetchTodos();
    } catch (error) {
      console.error('Toggle todo error:', error);
      alert('Failed to update todo status');
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    try {
      await axios.put(`${API_URL}/${editingId}`, { title: editTitle });
      setEditingId(null);
      setEditTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <>
    <div>
      <h1>TODO APP</h1>
      <button onClick={handleLogout} style={{ float: 'right', color: 'white' }}>Logout</button>
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="add todo" />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteAllTodos} style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}>Delete All</button>
      {isLoading ? (<p>Loading...</p>) :
        (todos.map((todo) => (
          <div key={todo.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {editingId === todo.id ? (
              <div>
                <input 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  type="text" 
                  style={{ marginRight: '10px' }}
                />
                <button onClick={saveEdit} style={{ marginRight: '5px' }}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p style={{ 
                  margin: '0 10px 0 0', 
                  display: 'inline-block',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : 'white'
                }}>{todo.title}</p>
                <button 
                  onClick={() => toggleTodoCompleted(todo.id)} 
                  style={{ 
                    marginRight: '5px',
                    backgroundColor: todo.completed ? '#28a745' : '#6c757d',
                    color: 'white'
                  }}
                >
                  {todo.completed ? 'Undo' : 'Mark as Done'}
                </button>
                <button onClick={() => startEdit(todo)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </div>
        )))
      }
    </div >
  </>;
}

export default Home;