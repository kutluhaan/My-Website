import React, { useEffect, useState } from "react";
import "./DeleteResume.css";

export default function DeleteResume() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchResumes = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/resume/all-resumes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setResumes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    fetch(`${process.env.REACT_APP_API_URL}/api/resume/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.msg);
        // Refresh resumes
        fetchResumes();
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div className="delete-resume-loading">Loading resumes...</div>;

  return (
    <div className="delete-resume-container">
      <h1 className="delete-resume-title">Delete Resumes</h1>
      {message && <p className="delete-resume-message">{message}</p>}
      {resumes.length === 0 ? (
        <p className="delete-resume-empty">No resumes found.</p>
      ) : (
        resumes.map(resume => (
          <div className="delete-resume-card" key={resume.id}>
            <div className="delete-resume-info">
              <p className="delete-resume-owner"><strong>Owner:</strong> {resume.owner_name}</p>
              <p className="delete-resume-email"><strong>Email:</strong> {resume.email}</p>
              <p className="delete-resume-phone"><strong>Phone:</strong> {resume.phone}</p>
            </div>
            <button
              className="delete-resume-button"
              onClick={() => handleDelete(resume.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
