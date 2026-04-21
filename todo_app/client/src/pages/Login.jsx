import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0', borderRadius: '5px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p style={{ marginTop: '10px' }}>
                Don't have an account? 
                <button 
                    onClick={() => navigate('/register')} 
                    style={{ marginLeft: '10px', border: 'none', background: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Register here
                </button>
            </p>
        </div>
    );
}

export default Login;
