// Plain JavaScript REST API Client (Lab 6 Q3)
const API_URL = 'http://localhost:5000/api/tasks';

// DOM Elements
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const errorMessage = document.getElementById('error-message');
const taskList = document.getElementById('task-list');
const refreshBtn = document.getElementById('refresh-btn');

/**
 * Fetches tasks from REST API and manages UI states
 */
async function fetchTasks() {
  // Show loading state, hide list and error
  loadingState.classList.remove('hidden');
  errorState.classList.add('hidden');
  taskList.classList.add('hidden');

  try {
    // Native fetch API call (Q3a)
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server returned HTTP status ${response.status} (${response.statusText})`);
    }

    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error(json.message || 'Invalid API response format');
    }

    // Render tasks list
    renderTasks(json.data);

    // Hide loading, show list
    loadingState.classList.add('hidden');
    taskList.classList.remove('hidden');
  } catch (err) {
    // Graceful error handling (Q3b & Q3c - Server offline protection)
    console.error('Fetch Error:', err);
    
    loadingState.classList.add('hidden');
    errorMessage.textContent = err.name === 'TypeError'
      ? `Network Error: Could not connect to API server at ${API_URL}. Ensure Express backend is running.`
      : err.message;
    
    errorState.classList.remove('hidden');
  }
}

/**
 * Renders task objects into HTML list items
 */
function renderTasks(tasks) {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="task-item">No tasks available</li>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';

    const idSpan = document.createElement('span');
    idSpan.className = 'task-id';
    idSpan.textContent = `#${task.id}`;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.title;

    infoDiv.appendChild(idSpan);
    infoDiv.appendChild(titleSpan);

    const statusSpan = document.createElement('span');
    statusSpan.className = `status-tag ${task.completed ? 'completed' : 'pending'}`;
    statusSpan.textContent = task.completed ? 'Completed' : 'Pending';

    li.appendChild(infoDiv);
    li.appendChild(statusSpan);

    taskList.appendChild(li);
  });
}

// Event Listeners
refreshBtn.addEventListener('click', fetchTasks);

// Initial Load
document.addEventListener('DOMContentLoaded', fetchTasks);
