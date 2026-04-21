import * as todoService from '../services/todo.services.js';

export const getAllTodos = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const todos = await todoService.getTodos(userId);
        res.json(todos);
    }
    catch (error) {
        next(error);
    }

};

export const createTodo = async (req, res, next) => {
    const { title } = req.body;
    const userId = req.user.id;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const newTodo = await todoService.createTodo(title, userId);
    res.status(201).json(newTodo);

};

export const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await todoService.deleteTodoById(id, userId);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};

export const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const userId = req.user.id;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const updatedTodo = await todoService.updateTodo(id, title, userId);
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        next(error);
    }
};

export const deleteAllTodos = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await todoService.deleteAllTodos(userId);
        res.status(200).json({ message: 'All todos deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};

export const toggleTodoCompleted = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await todoService.toggleTodoCompleted(id, userId);
        res.status(200).json({ message: 'Todo status updated successfully' });
    }
    catch (error) {
        next(error);
    }
};