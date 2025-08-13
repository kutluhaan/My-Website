import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AdminProvider } from './contexts/AdminContext';  // adjust path as needed
import { ProjectsProvider } from './contexts/ProjectContext';  // adjust path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AdminProvider>
  </React.StrictMode>
);

reportWebVitals();
