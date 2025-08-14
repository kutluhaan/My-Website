// AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // optional, for styling buttons

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <button className="directory-button" onClick={() => navigate("/admin/admin-ops")}>Admin Operations</button>
        <button className="directory-button"  onClick={() => navigate("/admin/resume-ops/ops")}>Resume Operations</button>
        <button className="directory-button"  onClick={() => navigate("/admin/project-ops/ops")}>Project Operations</button>
        <button className="directory-button"  onClick={() => navigate("/admin/certificate-ops/ops")}>Certificates Operations</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
