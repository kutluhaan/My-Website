import React, { useEffect, useState } from "react";
import "./DeleteProject.css";

export default function DeleteProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchProjects = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    fetch("http://localhost:5000/api/project/get-projects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this project?")) return;

    fetch(`http://localhost:5000/api/project/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.msg);
        fetchProjects();
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div className="delete-project-loading">Loading projects...</div>;

  return (
    <div className="delete-project-container">
      <h1 className="delete-project-title">Delete Projects</h1>
      {message && <p className="delete-project-message">{message}</p>}
      {projects.length === 0 ? (
        <p className="delete-project-empty">No projects found.</p>
      ) : (
        projects.map(project => (
          <div className="delete-project-card" key={project.id}>
            <div className="delete-project-info">
              <p className="delete-project-title-info"><strong>Title:</strong> {project.title}</p>
              <p className="delete-project-desc-info"><strong>Description:</strong> {project.description}</p>
              <p className="delete-project-github-info"><strong>GitHub:</strong> {project.github_link}</p>
              {project.website_link && <p className="delete-project-website-info"><strong>Website:</strong> {project.website_link}</p>}
            </div>
            <button
              className="delete-project-button"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
