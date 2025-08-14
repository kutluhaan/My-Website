import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UpdateCertificate.css';

const UpdateCertificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchCertificate = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    fetch(`http://127.0.0.1:5000/api/certificates/certificate/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCertificate(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to fetch certificate");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("You are not authenticated!");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/certificates/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...certificate,
            tags: certificate.tags
              ? certificate.tags.split(",").map((t) => t.trim())
              : [],
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || "Update failed");
      setMessage(data.msg);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Something went wrong");
    }
  };

  if (loading)
    return <div className="update-cert-page-loading">Loading certificate...</div>;
  if (!certificate)
    return <div className="update-cert-page-message">{message}</div>;

  return (
    <div className="update-cert-page-container">
      <h2 className="update-cert-page-title">Update Certificate</h2>
      {message && <p className="update-cert-page-message">{message}</p>}
      <form className="update-cert-page-form" onSubmit={handleSubmit}>
        <label className="update-cert-page-label">Title*</label>
        <input
          type="text"
          name="title"
          value={certificate.title}
          onChange={handleChange}
          className="update-cert-page-input"
          required
        />

        <label className="update-cert-page-label">Issuer*</label>
        <input
          type="text"
          name="issuer"
          value={certificate.issuer}
          onChange={handleChange}
          className="update-cert-page-input"
          required
        />

        <label className="update-cert-page-label">Issue Date*</label>
        <input
          type="date"
          name="issue_date"
          value={certificate.issue_date}
          onChange={handleChange}
          className="update-cert-page-input"
          required
        />

        <label className="update-cert-page-label">Expiration Date</label>
        <input
          type="date"
          name="expiration_date"
          value={certificate.expiration_date || ""}
          onChange={handleChange}
          className="update-cert-page-input"
        />

        <label className="update-cert-page-label">Credential ID</label>
        <input
          type="text"
          name="credential_id"
          value={certificate.credential_id || ""}
          onChange={handleChange}
          className="update-cert-page-input"
        />

        <label className="update-cert-page-label">Credential URL</label>
        <input
          type="url"
          name="credential_url"
          value={certificate.credential_url || ""}
          onChange={handleChange}
          className="update-cert-page-input"
        />

        <label className="update-cert-page-label">Category</label>
        <input
          type="text"
          name="category"
          value={certificate.category || ""}
          onChange={handleChange}
          className="update-cert-page-input"
        />

        <label className="update-cert-page-label">Description</label>
        <textarea
          name="description"
          value={certificate.description || ""}
          onChange={handleChange}
          className="update-cert-page-textarea"
        />

        <label className="update-cert-page-label">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={certificate.image_url || ""}
          onChange={handleChange}
          className="update-cert-page-input"
        />

        <label className="update-cert-page-label">File URL</label>
        <input
          type="url"
          name="file_url"
          value={certificate.file_url || ""}
          onChange={handleChange}
          className="update-cert-page-input"
        />

        <label className="update-cert-page-label">Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={certificate.tags || ""}
          onChange={handleChange}
          className="update-cert-page-input"
        />

        <button type="submit" className="update-cert-page-button">
          Update Certificate
        </button>
      </form>
    </div>
  );
};

export default UpdateCertificate;
