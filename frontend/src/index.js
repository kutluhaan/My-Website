import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AdminProvider } from './contexts/AdminContext';  // adjust path as needed
import { ProjectsProvider } from './contexts/ProjectContext';  // adjust path as needed
import { ResumeProvider } from './contexts/ResumeContext';  // adjust path as needed
import { CertificatesProvider } from './contexts/CertificatesContext';  // adjust path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminProvider>
      <ProjectsProvider>
        <ResumeProvider>
          <CertificatesProvider>
            <App />
          </CertificatesProvider>
        </ResumeProvider>
      </ProjectsProvider>
    </AdminProvider>
  </React.StrictMode>
);

reportWebVitals();
