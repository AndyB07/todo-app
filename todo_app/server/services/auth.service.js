import db from "../config/db.config.js";
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

export const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    return { id: rows.insertId, username, email };
}

export const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return rows;
}
