// Installation Commands
// Run these in your terminal
// Backend dependencies
// npm install express mongoose cors dotenv jsonwebtoken bcryptjs axios

// Frontend dependencies
// npm install axios react-router-dom tailwindcss

// server.js (Backend - Express & MongoDB)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}));

async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected")
    } catch (error) {
        console.log(error.message)
    }
}

dbConnect()


const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

const TaskSchema = new mongoose.Schema({
    userId: String,
    title: String,
    category: String,
    priority: String,
    dueDate: Date,
    completed: Boolean
});
const Task = mongoose.model('Task', TaskSchema);

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({
            success:true,
            message:"registration success"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Registration failed",
        })
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatched = await bcrypt.compare(password,user.password);
        if (!isMatched) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            token:token,
            userId:user._id,
            success:true,
            message:"login success"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Login failed"
        })
    }
});

// Get Tasks
app.get('/api/tasks', async (req, res) => {
    const { userId } = req.query;
    const tasks = await Task.find({ userId });
    return res.status(200).json({
        success:true,
        message:"fetched",
        todo:tasks
    })
});

// Add Task
app.post('/api/tasks', async (req, res) => {
    const task = req.body;
    try {
        const task = new Task(req.body);
        await task.save();
        return res.status(200).json({
            success:true,
            message:"Created Succfully",
            taskId:task._id
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:"failed",
        })
    }
});

// Update Task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            success:true,
            message:"Task updated succfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Todo updated failed"
        })
    }
});

// Delete Task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success:true,
            message:"Task deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete"
        })
    }
});

app.listen(8000, () => console.log('Server running on port 8000'));

