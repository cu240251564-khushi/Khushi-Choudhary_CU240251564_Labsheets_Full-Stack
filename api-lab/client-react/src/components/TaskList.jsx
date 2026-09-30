import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Read API Config from Environment Variables (Q5b)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'mysecretkey123';

export default function TaskList() {
  // 3-State Pattern (Q4a)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Client Library Mode: 'axios' vs 'fetch' for demonstration (Q4b)
  const [fetchMethod, setFetchMethod] = useState('axios');

  // New Task Form State (Q4c)
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  /* 
   * =========================================================================
   * FETCH VS AXIOS COMPARISON NOTE (Q4b):
   * 
   * 1. Native fetch():
   *    - Does NOT automatically reject on HTTP error status codes (e.g. 404, 500, 401).
   *    - Requires explicit check: if (!response.ok) throw new Error(...)
   *    - Requires separate JSON parsing step: await response.json()
   *    - Requires manual stringification of request body: body: JSON.stringify(data)
   * 
   * 2. Axios:
   *    - Automatically parses JSON responses (accessible directly via `response.data`).
   *    - Automatically throws an error for HTTP status codes outside 2xx (e.g. 401, 404).
   *    - Simplifies headers and request payload handling.
   * =========================================================================
   */

  // Fetch tasks function supporting both Axios and Fetch APIs
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      if (fetchMethod === 'axios') {
        // --- Axios Implementation (Q4b) ---
        // Axios automatically parses JSON and throws on 4xx/5xx status
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        if (response.data && response.data.success) {
          setTasks(response.data.data);
        } else {
          throw new Error('Unexpected API response structure');
        }
      } else {
        // --- Native Fetch Implementation (Q4a) ---
        // Fetch requires checking response.ok and manually calling .json()
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
          throw new Error(`HTTP Error status: ${response.status} (${response.statusText})`);
        }
        const json = await response.json();
        if (json.success) {
          setTasks(json.data);
        } else {
          throw new Error(json.message || 'Failed to fetch tasks');
        }
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      // Graceful error extraction (Axios error vs standard Error) (Q5a)
      const message = err.response?.data?.message || err.message || 'Unable to connect to REST API server';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on initial render and when fetchMethod changes
  useEffect(() => {
    fetchTasks();
  }, [fetchMethod]);

  // Handle Form Submission - POST new task (Q4c)
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setIsSubmitting(true);
    setActionError(null);
    setActionSuccess(null);

    try {
      if (fetchMethod === 'axios') {
        // Axios POST with x-api-key header and body payload
        const response = await axios.post(
          `${API_BASE_URL}/tasks`,
          { title: newTaskTitle.trim() },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': API_KEY
            }
          }
        );

        if (response.data && response.data.success) {
          // Update UI state immediately without full page reload
          setTasks(prev => [...prev, response.data.data]);
          setNewTaskTitle('');
          setActionSuccess(`Task "${response.data.data.title}" created successfully!`);
        }
      } else {
        // Native Fetch POST with x-api-key header and JSON.stringify(body)
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify({ title: newTaskTitle.trim() })
        });

        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(json.message || 'Failed to create task');
        }

        // Update UI state immediately
        setTasks(prev => [...prev, json.data]);
        setNewTaskTitle('');
        setActionSuccess(`Task "${json.data.title}" created successfully!`);
      }
    } catch (err) {
      console.error('Create Task Error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to create task';
      setActionError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Task - DELETE by ID (Q4c & Q5a)
  const handleDeleteTask = async (taskId) => {
    setActionError(null);
    setActionSuccess(null);

    try {
      if (fetchMethod === 'axios') {
        // Axios DELETE request with x-api-key header
        const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
          headers: {
            'x-api-key': API_KEY
          }
        });

        if (response.data && response.data.success) {
          // Update UI immediately by filtering out deleted item
          setTasks(prev => prev.filter(t => t.id !== taskId));
          setActionSuccess(`Task #${taskId} deleted successfully`);
        }
      } else {
        // Native Fetch DELETE request
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'x-api-key': API_KEY
          }
        });

        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(json.message || `Server returned error ${response.status}`);
        }

        // Update UI state immediately
        setTasks(prev => prev.filter(t => t.id !== taskId));
        setActionSuccess(`Task #${taskId} deleted successfully`);
      }
    } catch (err) {
      console.error('Delete Task Error:', err);
      // Q5(a): Graceful UI error display on 404 / non-existent ID or 401
      const msg = err.response?.data?.message || err.message || `Error deleting task #${taskId}`;
      setActionError(`Delete Failed: ${msg}`);
    }
  };

  return (
    <div className="task-container">
      {/* Client Implementation Switcher & Reload (Q4b) */}
      <div className="controls-bar">
        <div className="method-selector">
          <label htmlFor="fetch-method-select">Data Fetching Engine:</label>
          <select 
            id="fetch-method-select"
            value={fetchMethod} 
            onChange={(e) => setFetchMethod(e.target.value)}
            className="method-select"
          >
            <option value="axios">Axios (Auto JSON & HTTP status throwing)</option>
            <option value="fetch">Native Fetch (Manual res.json() & res.ok check)</option>
          </select>
        </div>
        <button onClick={fetchTasks} className="btn-secondary" id="reload-tasks-btn">
          🔄 Reload List
        </button>
      </div>

      {/* Add Task Form (Q4c) */}
      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          placeholder="Enter new task title..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="task-input"
          disabled={isSubmitting}
          id="new-task-input"
        />
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting || !newTaskTitle.trim()}
          id="add-task-btn"
        >
          {isSubmitting ? 'Creating...' : '+ Add Task'}
        </button>
      </form>

      {/* Graceful Action Banners (Success / Error alerts) (Q5a) */}
      {actionSuccess && (
        <div className="alert alert-success">
          <span>✅ {actionSuccess}</span>
          <button onClick={() => setActionSuccess(null)} className="alert-close">×</button>
        </div>
      )}

      {actionError && (
        <div className="alert alert-error">
          <span>⚠️ {actionError}</span>
          <button onClick={() => setActionError(null)} className="alert-close">×</button>
        </div>
      )}

      {/* Fake ID Test Button for Q5a Verification */}
      <div className="test-actions">
        <span className="test-label">Q5(a) Failure Path Verification:</span>
        <button 
          onClick={() => handleDeleteTask(9999)} 
          className="btn-test-error"
          id="test-fake-delete-btn"
        >
          🧪 Delete Non-Existent ID #9999 (Triggers 404)
        </button>
      </div>

      {/* 3-State Display: Loading, Error, Data (Q4a) */}
      {loading && (
        <div className="state-box loading-box">
          <div className="spinner"></div>
          <span>Loading tasks via {fetchMethod.toUpperCase()}...</span>
        </div>
      )}

      {error && !loading && (
        <div className="state-box error-box">
          <h3>Connection Error</h3>
          <p>{error}</p>
          <button onClick={fetchTasks} className="btn-retry">Retry Connection</button>
        </div>
      )}

      {!loading && !error && (
        <div className="task-grid">
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks found. Create one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-card-content">
                  <span className="task-badge">#{task.id}</span>
                  <h3 className="task-card-title">{task.title}</h3>
                </div>

                <div className="task-card-footer">
                  <span className={`status-pill ${task.completed ? 'completed' : 'pending'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn-delete"
                    title="Delete task"
                    id={`delete-btn-${task.id}`}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
