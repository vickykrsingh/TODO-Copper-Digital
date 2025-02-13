import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = ({ userId }) => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchTodo();
    }, []);

    async function fetchTodo() {
        try {
            const { data } = await axios.get(`/tasks?userId=${userId}`);
            if (data.success) {
                setTasks(data.todo);
            }
        } catch (error) {
            setTasks([]);
        }
    }

    const addTask = async () => {
        const newTask = { userId, title, category, priority, dueDate, completed: false };
        try {
            const { data } = await axios.post('/tasks', newTask);
            if (data.success) {
                setTasks([...tasks, { ...newTask, _id: data.taskId }]);
                alert(data.message);
                setTitle('');
                setCategory('');
                setDueDate('');
                setPriority('');
            } else {
                alert('Failed to add task');
            }
        } catch (error) {
            alert('Server error');
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            alert('Failed to delete task');
        }
    };

    const updateTask = async (id) => {
        try {
            const { data } = await axios.put(`/tasks/${id}`, editData);
            if (data.success) {
                setTasks(tasks.map(task => (task._id === id ? { ...task, ...editData } : task)));
                setEditTaskId(null);
                alert('Task updated successfully');
            }
        } catch (error) {
            alert('Failed to update task');
        }
    };

    return (
        <div className="p-5 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="border p-2 w-full mb-2" />
            <input type="text" placeholder="Priority" value={priority} onChange={e => setPriority(e.target.value)} className="border p-2 w-full mb-2" />
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border p-2 w-full mb-2" />
            <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 w-full rounded-md">Add Task</button>
            <ul className="mt-4">
                {tasks.length > 0 && tasks.map(task =>
                    <li key={task._id} className="border p-2 mb-2 flex justify-between">
                        {editTaskId === task._id ? (
                            <div className="flex flex-col w-full">
                                <input type="text" value={editData.title || ''} onChange={e => setEditData({ ...editData, title: e.target.value })} className="border p-1 mb-1" />
                                <input type="text" value={editData.category || ''} onChange={e => setEditData({ ...editData, category: e.target.value })} className="border p-1 mb-1" />
                                <input type="text" value={editData.priority || ''} onChange={e => setEditData({ ...editData, priority: e.target.value })} className="border p-1 mb-1" />
                                <input type="date" value={editData.dueDate || ''} onChange={e => setEditData({ ...editData, dueDate: e.target.value })} className="border p-1 mb-1" />
                                <button onClick={() => updateTask(task._id)} className="bg-blue-500 text-white px-2 py-1 rounded-md mb-1">Save</button>
                                <button onClick={() => setEditTaskId(null)} className="bg-gray-500 text-white px-2 py-1 rounded-md">Cancel</button>
                            </div>
                        ) : (
                            <>
                                <span>{task.title} - {task.category} - {task.priority}</span>
                                <div>
                                    <button onClick={() => { setEditTaskId(task._id); setEditData(task); }} className="bg-yellow-500 text-white px-2 rounded-md mr-2">Edit</button>
                                    <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-2 rounded-md">X</button>
                                </div>
                            </>
                        )}
                    </li>
                )}
            </ul>
        </div>
    );
};
export default TodoList;
