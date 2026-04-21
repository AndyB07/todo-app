import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "../components/ProtectedRoutes";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppContent() {
    const { login } = useAuth();

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            if (response.ok) {
                const data = await response.json();
                login(data.token);
                window.location.href = '/';
            } else {
                const error = await response.json();
                alert('Login failed: ' + error.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;