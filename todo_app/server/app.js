import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

console.log('Loading routes...');
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// Add a test route to verify server is working
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

console.log('Routes loaded successfully');
export default app;