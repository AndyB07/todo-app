import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as authServices from '../services/auth.service.js';
export const register = async (req, res) => {
    try {
        console.log('Registration request received:', req.body);
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const user = await authServices.registerUser(username, email, password);
        console.log('User registered successfully:', user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authServices.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

