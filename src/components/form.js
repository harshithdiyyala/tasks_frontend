import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave,editMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      clearForm(); // Clear form when no task is provided (new task creation)
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedTask = { title, description, status };
    onSave(savedTask);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <div className="form-container height"> {/* Ensure this class is styled appropriately */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <br/>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style ={{width:"100%"}}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <br/>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <br/>
        <button type="submit" className="form-button">{editMode ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
