import React, { useEffect, useState } from "react";
import "./GetResumes.css";

export default function GetResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    
    fetch(`${process.env.REACT_APP_API_URL}/api/resume/all-resumes`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
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
  }, []);

  if (loading) {
    return <div className="loading">Loading resumes...</div>;
  }

  return (
    <div className="resumes-container">
      <h1>All Resumes</h1>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        resumes.map(resume => (
          <div className="resume-card" key={resume.id}>
            
            <h2>{resume.owner_name}</h2>
            <p><strong>ID:</strong> {resume.id}</p>
            <p><strong>Email:</strong> {resume.email}</p>
            <p><strong>Phone:</strong> {resume.phone}</p>
            {resume.website && <p><strong>Website:</strong> <a href={resume.website} target="_blank" rel="noreferrer">{resume.website}</a></p>}
            {resume.github && <p><strong>GitHub:</strong> <a href={resume.github} target="_blank" rel="noreferrer">{resume.github}</a></p>}
            {resume.linkedin && <p><strong>LinkedIn:</strong> <a href={resume.linkedin} target="_blank" rel="noreferrer">{resume.linkedin}</a></p>}
            {resume.pdf_url && <p><strong>PDF:</strong> <a href={resume.pdf_url} target="_blank" rel="noreferrer">View PDF</a></p>}

            <div className="parts-section">
              {resume.parts && resume.parts.map(part => (
                <div className="part-card" key={part.id}>
                  <h3>{part.title}</h3>
                  {part.sub_parts && part.sub_parts.map(sub => (
                    <div className="subpart-card" key={sub.id}>
                      <p><strong>Name:</strong> {sub.name}</p>
                      {sub.location && <p><strong>Location:</strong> {sub.location}</p>}
                      {sub.start_date && <p><strong>Start Date:</strong> {sub.start_date}</p>}
                      {sub.end_date && <p><strong>End Date:</strong> {sub.end_date}</p>}
                      {sub.description && (
                        <div>
                          <strong>Description:</strong>
                          <ul>
                            {Array.isArray(sub.description)
                              ? sub.description.map((d, i) => <li key={i}>{d}</li>)
                              : <li>{sub.description}</li>}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
