import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import axios from 'axios';
axios.defaults.baseURL=import.meta.env.VITE_API_KEY

const App = () => {
  const [user, setUser] = useState(null);
  return (
      <Router>
          <Navbar/>
          <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={localStorage.getItem('token') ? <TodoList userId={localStorage.getItem('userId')} /> : <Navigate to="/login"/>} />
          </Routes>
      </Router>
  );
};
export default App;