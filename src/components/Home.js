import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './form';
import { createTask, fetchTasks, updateTask, deleteTask } from '../services/services';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); 
  const [editMode, setEditMode] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.reload()  // Redirect instead of reloading
    }
    getTasks();
  }, []);

  const handleCreateUpdateTask = async (task) => {
    if (editTask) {
      await updateTask(editTask._id, task);
    } else {
      await createTask(task);
    }
    setEditMode(false);
    setEditTask(null);
    getTasks(); // Refresh the list of tasks
  };

  const getTasks = async () => {
    const response = await fetchTasks();
    setTasks(response);
  };

  const handleEditClick = (task) => {
    setEditTask(task); 
    setEditMode(true); 
  };

  const handleDelete = async (task) => {
    await deleteTask(task._id);
    getTasks(); // Refresh tasks after deletion
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Proper way to handle routing
  };

  return (
    <div className="home-container">
      <div className="left">
        <div className='flex-space'>
        <h1>Welcome to Your Task Manager</h1>
        <button onClick={logout}>Logout</button>
        </div>
        
        
        <h2>Your Tasks</h2>
        <ul>
          {tasks.map(item => (
            <li key={item._id}>
              <div>
              <span onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }}>
                {item.title}
              </span>
              <button onClick={() => handleDelete(item)}>Delete</button>
              </div>
              <div>
              <p className='description'>{item.description}</p>
              <p className='status'>Current Status: {item.status}</p>
              </div>
            </li>
          ))}
        </ul>
        
      </div>
      <div className='right'>
      <h2>{editMode ? 'Edit Task' : 'Create a Task'}</h2>
        <TaskForm task={editTask} onSave={handleCreateUpdateTask} />
        <br/>
        {editMode && <button onClick={() => setEditMode(false)}>Cancel Edit</button>}

      </div>
    </div>
  );
};

export default Home;
