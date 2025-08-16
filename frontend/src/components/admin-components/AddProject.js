import React, { useState } from "react";
import './AddProject.css'

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [images, setImages] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("You are not authenticated!");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/project/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          github_link: githubLink,
          website_link: websiteLink,
          images: images.split(",").map((img) => img.trim()),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.msg || "Something went wrong");
        return;
      }

      setMessage(`Project added successfully! ID: ${data.id}`);
      setTitle("");
      setDescription("");
      setGithubLink("");
      setWebsiteLink("");
      setImages("");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="add-project-page-container">
      <h2 className="add-project-page-title">Add New Project</h2>
      <form className="add-project-page-form" onSubmit={handleSubmit}>
        <label className="add-project-page-label">Title*</label>
        <input
          type="text"
          className="add-project-page-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="add-project-page-label">Description*</label>
        <textarea
          className="add-project-page-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="add-project-page-label">GitHub Link*</label>
        <input
          type="url"
          className="add-project-page-input"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          required
        />

        <label className="add-project-page-label">Website Link</label>
        <input
          type="url"
          className="add-project-page-input"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />

        <label className="add-project-page-label">Images (comma-separated URLs)</label>
        <input
          type="text"
          className="add-project-page-input"
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />

        <button type="submit" className="add-project-page-button">Add Project</button>
      </form>
      {message && <p className="add-project-page-message">{message}</p>}
    </div>
  );
};

export default AddProject;
