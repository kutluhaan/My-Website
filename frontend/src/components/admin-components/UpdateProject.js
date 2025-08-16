import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UpdateProject.css";

const UpdateProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [images, setImages] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/project/get-projects`);
        const data = await response.json();
        if (!response.ok) {
          setMessage(data.msg || "Failed to fetch project");
          return;
        }

        const proj = data.projects.find((p) => p.id === parseInt(id));
        if (!proj) {
          setMessage("Project not found");
          return;
        }

        setProject(proj);
        setTitle(proj.title || "");
        setDescription(proj.description || "");
        setGithubLink(proj.github_link || "");
        setWebsiteLink(proj.website_link || "");
        setImages(proj.images ? proj.images.join(", ") : "");
      } catch (err) {
        console.error(err);
        setMessage("Error fetching project");
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("You are not authenticated!");
      return;
    }

    try { 
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/project/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          github_link: githubLink,
          website_link: websiteLink,
          images: images.split(",").map((img) => img.trim()),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to update project");
      setMessage("Project updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Something went wrong");
    }
  };

  if (!project) return <p className="update-project-page-loading">Loading project...</p>;

  return (
    <div className="update-project-page-container">
      <h2 className="update-project-page-title">Update Project</h2>
      {message && <p className="update-project-page-message">{message}</p>}
      <form className="update-project-page-form" onSubmit={handleSubmit}>
        <label className="update-project-page-label">Title*</label>
        <input
          type="text"
          className="update-project-page-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="update-project-page-label">Description*</label>
        <textarea
          className="update-project-page-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="update-project-page-label">GitHub Link*</label>
        <input
          type="url"
          className="update-project-page-input"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          required
        />

        <label className="update-project-page-label">Website Link</label>
        <input
          type="url"
          className="update-project-page-input"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />

        <label className="update-project-page-label">Images (comma-separated URLs)</label>
        <input
          type="text"
          className="update-project-page-input"
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />

        <button type="submit" className="update-project-page-button">Update Project</button>
      </form>
    </div>
  );
};

export default UpdateProject;
