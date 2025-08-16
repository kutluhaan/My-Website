import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import './DeleteCertificate.css';

const DeleteCertificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchCertificate = useCallback(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/certificates/certificate/${id}`, {
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
  }, [id]);

  useEffect(() => {
    fetchCertificate();
  }, [fetchCertificate]);

  const handleDelete = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this certificate?")) return;

    fetch(`${process.env.REACT_APP_API_URL}/api/certificates/certificates/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.msg);
        setCertificate(null);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <div className="delete-cert-page-loading">Loading certificate...</div>;
  if (!certificate) return <div className="delete-cert-page-empty">{message || "No certificate found."}</div>;

  return (
    <div className="delete-cert-page-container">
      <h1 className="delete-cert-page-title">Delete Certificate</h1>
      {message && <p className="delete-cert-page-message">{message}</p>}

      <div className="delete-cert-page-card">
        {certificate.image_url && (
          <div className="delete-cert-page-image">
            <img src={certificate.image_url} alt={certificate.title} />
          </div>
        )}
        <div className="delete-cert-page-info">
          <p><strong>Title:</strong> {certificate.title}</p>
          <p><strong>Issuer:</strong> {certificate.issuer}</p>
          <p><strong>Issue Date:</strong> {certificate.issue_date || "-"}</p>
          <p><strong>Expiration Date:</strong> {certificate.expiration_date || "N/A"}</p>
          <p><strong>Credential ID:</strong> {certificate.credential_id || "-"}</p>
          <p><strong>Credential URL:</strong> {certificate.credential_url ? <a href={certificate.credential_url} target="_blank" rel="noopener noreferrer">{certificate.credential_url}</a> : "-"}</p>
          <p><strong>Category:</strong> {certificate.category || "-"}</p>
          <p><strong>Description:</strong> {certificate.description || "-"}</p>
          <p><strong>File URL:</strong> {certificate.file_url ? <a href={certificate.file_url} target="_blank" rel="noopener noreferrer">{certificate.file_url}</a> : "-"}</p>
          <p><strong>Tags:</strong> {certificate.tags ? certificate.tags.join(", ") : "-"}</p>
          <p><strong>Created At:</strong> {certificate.created_at || "-"}</p>
          <p><strong>Admin ID:</strong> {certificate.admin_id}</p>
        </div>
        <button
          className="delete-cert-page-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteCertificate;
