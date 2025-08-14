import React, { useState } from "react";
import './AddCertificate.css';

const AddCertificate = () => {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("You are not authenticated!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/certificates/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          issuer,
          issue_date: issueDate,
          expiration_date: expirationDate || null,
          credential_id: credentialId,
          credential_url: credentialUrl,
          category,
          description,
          image_url: imageUrl,
          file_url: fileUrl,
          tags: tags.split(",").map((t) => t.trim()),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || "Failed to add certificate");

      setMessage(`Certificate added successfully! ID: ${data.id}`);
      setTitle("");
      setIssuer("");
      setIssueDate("");
      setExpirationDate("");
      setCredentialId("");
      setCredentialUrl("");
      setCategory("");
      setDescription("");
      setImageUrl("");
      setFileUrl("");
      setTags("");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="add-cert-page-container">
      <h2 className="add-cert-page-title">Add New Certificate</h2>
      <form className="add-cert-page-form" onSubmit={handleSubmit}>
        <label className="add-cert-page-label">Title*</label>
        <input
          type="text"
          className="add-cert-page-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="add-cert-page-label">Issuer*</label>
        <input
          type="text"
          className="add-cert-page-input"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          required
        />

        <label className="add-cert-page-label">Issue Date*</label>
        <input
          type="date"
          className="add-cert-page-input"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          required
        />

        <label className="add-cert-page-label">Expiration Date</label>
        <input
          type="date"
          className="add-cert-page-input"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />

        <label className="add-cert-page-label">Credential ID</label>
        <input
          type="text"
          className="add-cert-page-input"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
        />

        <label className="add-cert-page-label">Credential URL</label>
        <input
          type="url"
          className="add-cert-page-input"
          value={credentialUrl}
          onChange={(e) => setCredentialUrl(e.target.value)}
        />

        <label className="add-cert-page-label">Category</label>
        <input
          type="text"
          className="add-cert-page-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label className="add-cert-page-label">Description</label>
        <textarea
          className="add-cert-page-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="add-cert-page-label">Image URL</label>
        <input
          type="url"
          className="add-cert-page-input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label className="add-cert-page-label">File URL (PDF)</label>
        <input
          type="url"
          className="add-cert-page-input"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />

        <label className="add-cert-page-label">Tags (comma-separated)</label>
        <input
          type="text"
          className="add-cert-page-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit" className="add-cert-page-button">Add Certificate</button>
      </form>
      {message && <p className="add-cert-page-message">{message}</p>}
    </div>
  );
};

export default AddCertificate;
