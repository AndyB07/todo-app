import express from 'express';
import { createTodo, deleteTodo, getAllTodos, updateTodo, deleteAllTodos, toggleTodoCompleted} from '../controller/todo.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply authentication middleware to all todo routes
router.use(verifyToken);

router.get('/', getAllTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);
router.delete('/', deleteAllTodos);
router.patch('/:id/toggle', toggleTodoCompleted);

export default router;