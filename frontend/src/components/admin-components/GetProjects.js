import React, { useEffect, useState } from "react";
import './GetProjects.css'

const GetProjects = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/project/get-projects`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.msg || "Something went wrong");
          return;
        }

        setProjects(data.projects || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="get-projects-page-container">
      <h2 className="get-projects-page-title">All Projects</h2>
      {message && <p className="get-projects-page-message">{message}</p>}

      {projects.length === 0 && !message && (
        <p className="get-projects-page-empty">No projects found.</p>
      )}

      <div className="get-projects-page-list">
        {projects.map((project) => (
          <div key={project.id} className="get-projects-page-item">
            <h3 className="get-projects-page-item-title">{project.title}</h3>
            <p><strong>ID: </strong>{project.id}</p>
            <p className="get-projects-page-item-description">{project.description}</p>
            <p className="get-projects-page-item-links">
              <a
                className="get-projects-page-item-github"
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {project.website_link && (
                <a
                  className="get-projects-page-item-website"
                  href={project.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              )}
            </p>
            {project.images && project.images.length > 0 && (
              <div className="get-projects-page-item-images">
                {project.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="get-projects-page-item-image"
                  />
                ))}
              </div>
            )}
            <p className="get-projects-page-item-date">
              Created at: {project.created_at ? new Date(project.created_at).toLocaleString() : "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetProjects;
