const API_URL = 'https://tasks-backend-wdph.onrender.com/users/';

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data)    
        } else {
            throw new Error(data.message || "Failed to login");
        }
        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to register");
        }
        return data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

const TASK_API_URL = 'https://tasks-backend-wdph.onrender.com/tasks/';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const fetchTasks = async () => {
    try {
        const response = await fetch(TASK_API_URL, {
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const fetchTaskById = async (id) => {
    try {
        const response = await fetch(`${TASK_API_URL}${id}`, {
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await fetch(TASK_API_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(task)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await fetch(`${TASK_API_URL}${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(task)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${TASK_API_URL}${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // You might want to handle different types of responses based on your backend setup.
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
