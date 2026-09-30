import React from 'react';
import TaskList from './components/TaskList';
import './index.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-badge">Lab 6 - React & Express REST API</div>
        <h1>Task Manager Mini App</h1>
        <p className="app-sub">Built with Vite, React, Axios, Express & Node.js</p>
      </header>

      <main className="app-main">
        <TaskList />
      </main>

      <footer className="app-footer">
        <p>Full-Stack Task Manager REST API • Powered by Express & React</p>
      </footer>
    </div>
  );
}

export default App;
