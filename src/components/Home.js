import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './form';
import { createTask, fetchTasks, updateTask, deleteTask } from '../services/services';
import {PieChart,Pie,Cell,Legend,Tooltip,ResponsiveContainer} from 'recharts'


  const MetricsChart = ({ tasks }) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
    const data = [
        { name: 'Pending', count: 0 },
        { name: 'Completed', count: 0 },
        { name: 'In Progress', count: 0 }
    ];

    tasks.forEach(item => {
        if (item.status === 'Pending') data[0].count += 1;
        else if (item.status === 'completed') data[1].count += 1;
        else if (item.status === 'In Progress') data[2].count += 1;
    });

    console.log(data);

    if (tasks.length === 0) return <p>Loading...</p>;

    return (
      <div className='flex-space'>
        <ResponsiveContainer width="65%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="count"
                    paddingAngle={3}
                    label={(entry) => `${entry.name}: ${entry.count}`}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke = "none"
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
};

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
              <div >
              <span onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }}>
                {item.title}
              </span>
              <div style ={{justifyContent:"center",gap:"0.3rem",width:"auto",}}>
              <button onClick={() => handleEditClick(item)} style={{ cursor: 'pointer',alignSelf:'flex-end',backgroundColor:"green" }}>
                Update
              </button>
              <button onClick={() => handleDelete(item)} style ={{backgroundColor:"red"}}>Delete</button>
              </div>
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

      <MetricsChart tasks = {tasks}/>
        <h2>{editMode ? 'Edit Task' : 'Create a Task'}</h2>
        <TaskForm task={editTask} onSave={handleCreateUpdateTask} editMode = {editMode}/>
        <br/>
        {editMode && <button onClick={() => setEditMode(false)}>Cancel Edit</button>}
        
      </div>
    </div>
  );
};

export default Home;
