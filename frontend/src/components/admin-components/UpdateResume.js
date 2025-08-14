// src/pages/admin/resumeOps/UpdateResume.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateResume.css";

const UpdateResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    admin_id: "",
    owner_name: "",
    website: "",
    phone: "",
    email: "",
    github: "",
    linkedin: "",
    pdf_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await fetch(`http://127.0.0.1:5000/api/resume/get-resume/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch resume data");
        }

        const data = await res.json();
        setFormData({
          admin_id: data.admin_id || "",
          owner_name: data.owner_name || "",
          website: data.website || "",
          phone: data.phone || "",
          email: data.email || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          pdf_url: data.pdf_url || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`http://127.0.0.1:5000/api/resume/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || "Failed to update resume");
      }

      navigate("/admin/resume-ops/get-resumes");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="resume-form-page">Loading resume data...</div>;
  }

  return (
    <div className="update-resume-page">
  <div className="update-resume-container">
    <h2 className="update-resume-title">Update Resume</h2>
    <p className="update-resume-subtitle">Change the fields you want and submit.</p>
    {error && <p className="update-resume-error">{error}</p>}

    <form className="update-resume-form" onSubmit={handleSubmit}>
      <div className="form-group owner-name-group">
        <label className="form-label">Owner Name*</label>
        <input
          className="form-input owner-name-input"
          type="text"
          name="owner_name"
          value={formData.owner_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group website-group">
        <label className="form-label">Website</label>
        <input
          className="form-input website-input"
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="form-group phone-group">
        <label className="form-label">Phone*</label>
        <input
          className="form-input phone-input"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group email-group">
        <label className="form-label">Email*</label>
        <input
          className="form-input email-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group github-group">
        <label className="form-label">GitHub</label>
        <input
          className="form-input github-input"
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
        />
      </div>

      <div className="form-group linkedin-group">
        <label className="form-label">LinkedIn</label>
        <input
          className="form-input linkedin-input"
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </div>

      <div className="form-group pdf-url-group">
        <label className="form-label">PDF URL</label>
        <input
          className="form-input pdf-url-input"
          type="url"
          name="pdf_url"
          value={formData.pdf_url}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-resume-btn">Update Resume</button>
    </form>
  </div>
</div>

  );
};

export default UpdateResume;
