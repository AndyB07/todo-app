import db from '../config/db.config.js';

export const getTodos = async (userId) => {
const [rows] = await db.query('SELECT * FROM todos WHERE user_id = ?', [userId]);
return rows;
}

export const createTodo = async (title, userId) =>{
const [rows] = await db.query('INSERT INTO todos (title, user_id) VALUES (?, ?)', [title, userId]);
return { id: rows.insertId, title, completed: false, user_id: userId };
}

export const deleteTodoById = async (id, userId) =>{
const [rows] = await db.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, userId]);
return rows;
}

export const updateTodo = async (id, title, userId) => {
const [rows] = await db.query('UPDATE todos SET title = ? WHERE id = ? AND user_id = ?', [title, id, userId]);
return rows;
}

export const deleteAllTodos = async (userId) => {
const [rows] = await db.query('DELETE FROM todos WHERE user_id = ?', [userId]);
return rows;
}

export const toggleTodoCompleted = async (id, userId) => {
const [rows] = await db.query('UPDATE todos SET completed = NOT completed WHERE id = ? AND user_id = ?', [id, userId]);
return rows;
}
