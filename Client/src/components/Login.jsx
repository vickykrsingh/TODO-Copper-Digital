import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const {data} = await axios.post('/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            setUser(data);
            navigate('/');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="p-5 max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-2" placeholder="Password" />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 w-full rounded-md">Login</button>
        </div>
    );
};
export default Login;
