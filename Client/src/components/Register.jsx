import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const {data} = await axios.post('/register', { username, email, password });
            if(data.success){
                navigate('/login')
            }
        } catch (error) {
            alert("registration failed")
        }
    };

    return (
        <div className="p-5 max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 w-full mb-2" placeholder="Username" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-2" placeholder="Password" />
            <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 w-full rounded-md">Register</button>
        </div>
    );
};
export default Register;
