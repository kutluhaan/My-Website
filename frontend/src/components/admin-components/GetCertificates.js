import React, { useEffect, useState } from "react";
import './GetCertificates.css'

const GetCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchCertificates = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    fetch("http://127.0.0.1:5000/api/certificates/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to fetch certificates");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  if (loading) return <div className="get-cert-page-loading">Loading certificates...</div>;

  return (
    <div className="get-cert-page-container">
      <h1 className="get-cert-page-title">All Certificates</h1>
      {message && <p className="get-cert-page-message">{message}</p>}
      {certificates.length === 0 ? (
        <p className="get-cert-page-empty">No certificates found.</p>
      ) : (
        certificates.map((cert) => (
          <div className="get-cert-page-card" key={cert.id}>
            <div className="get-cert-page-info">
              <p><strong>Title:</strong> {cert.title}</p>
              <p><strong>ID:</strong> {cert.id}</p>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Issue Date:</strong> {cert.issue_date}</p>
              {cert.expiration_date && <p><strong>Expiration Date:</strong> {cert.expiration_date}</p>}
              {cert.category && <p><strong>Category:</strong> {cert.category}</p>}
              {cert.description && <p><strong>Description:</strong> {cert.description}</p>}
              {cert.tags.length > 0 && <p><strong>Tags:</strong> {cert.tags.join(", ")}</p>}
            </div>
            <div className="get-cert-page-links">
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="get-cert-page-link"
                >
                  Credential
                </a>
              )}
              {cert.file_url && (
                <a
                  href={cert.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="get-cert-page-link"
                >
                  PDF
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetCertificates;
