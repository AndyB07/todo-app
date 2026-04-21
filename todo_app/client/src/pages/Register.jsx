import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                // Redirect to login after successful registration
                navigate('/login');
            } else {
                const error = await response.json();
                console.error('Registration failed:', error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default Register;