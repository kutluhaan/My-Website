import React, { useState } from "react";
import "./AdminOps.css";

const AdminOps = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    about: "",
    profile_photo_url: "",
    linkedin_url: "",
    instagram_url: "",
    leetcode_url: "",
    github_url: "",
    hackerrank_url: "",
    spotify_url: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("You are not authorized.");
      return;
    }

    // Remove empty fields for partial update
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    try {
      const res = await fetch("http://127.0.0.1:5000/api/admin/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filteredData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.msg || "Admin updated successfully.");
        setFormData({
          email: "",
          password: "",
          about: "",
          profile_photo_url: "",
          linkedin_url: "",
          instagram_url: "",
          leetcode_url: "",
          github_url: "",
          hackerrank_url: "",
          spotify_url: "",
        });
      } else {
        setError(data.msg || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="admin-ops-page">
      <div className="admin-ops-container">
        <h2>Update Admin Info</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="New Email" />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password" />

          <label>About</label>
          <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About info" />

          <label>Profile Photo URL</label>
          <input name="profile_photo_url" value={formData.profile_photo_url} onChange={handleChange} placeholder="Profile Photo URL" />

          <label>LinkedIn URL</label>
          <input name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} placeholder="LinkedIn Profile" />

          <label>Instagram URL</label>
          <input name="instagram_url" value={formData.instagram_url} onChange={handleChange} placeholder="Instagram Profile" />

          <label>LeetCode URL</label>
          <input name="leetcode_url" value={formData.leetcode_url} onChange={handleChange} placeholder="LeetCode Profile" />

          <label>GitHub URL</label>
          <input name="github_url" value={formData.github_url} onChange={handleChange} placeholder="GitHub Profile" />

          <label>HackerRank URL</label>
          <input name="hackerrank_url" value={formData.hackerrank_url} onChange={handleChange} placeholder="HackerRank Profile" />

          <label>Spotify URL</label>
          <input name="spotify_url" value={formData.spotify_url} onChange={handleChange} placeholder="Spotify Profile" />

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <button type="submit">Update Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminOps;
