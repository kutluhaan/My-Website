// src/pages/admin/resumeOps/AddResume.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddResume.css";

const AddResume = () => {
  const navigate = useNavigate();
  
  // Resume main info
  const [ownerName, setOwnerName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // Resume parts
  const [parts, setParts] = useState([
    { title: "", order_index: 0, sub_parts: [{ name: "", location: "", description: "", start_date: "", end_date: "", order_id: 0 }] }
  ]);

  const handlePartChange = (index, field, value) => {
    const newParts = [...parts];
    newParts[index][field] = value;
    setParts(newParts);
  };

  const handleSubPartChange = (partIndex, subIndex, field, value) => {
    const newParts = [...parts];
    newParts[partIndex].sub_parts[subIndex][field] = value;
    setParts(newParts);
  };

  const addPart = () => {
    setParts([...parts, { title: "", order_index: 0, sub_parts: [{ name: "", location: "", description: "", start_date: "", end_date: "", order_id: 0 }] }]);
  };

  const addSubPart = (partIndex) => {
    const newParts = [...parts];
    newParts[partIndex].sub_parts.push({ name: "", location: "", description: "", start_date: "", end_date: "", order_id: 0 });
    setParts(newParts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("You must be logged in");
      return;
    }

    const payload = {
      owner_name: ownerName,
      website,
      phone,
      email,
      github,
      linkedin,
      pdf_url: pdfUrl,
      parts
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/resume/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Resume added successfully!");
        navigate("/admin/resume-ops/ops");
      } else {
        const data = await res.json();
        alert(data.msg || "Error adding resume");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="add-resume-page">
  <h2 className="add-resume-title">Add New Resume</h2>
  <form className="add-resume-form" onSubmit={handleSubmit}>
    
    <div className="resume-main-info">
      <div className="resume-field owner-name-field">
        <label className="resume-label">Owner Name*</label>
        <input className="resume-input owner-name-input" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
      </div>

      <div className="resume-field website-field">
        <label className="resume-label">Website</label>
        <input className="resume-input website-input" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className="resume-field phone-field">
        <label className="resume-label">Phone*</label>
        <input className="resume-input phone-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      <div className="resume-field email-field">
        <label className="resume-label">Email*</label>
        <input className="resume-input email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="resume-field github-field">
        <label className="resume-label">GitHub</label>
        <input className="resume-input github-input" value={github} onChange={(e) => setGithub(e.target.value)} />
      </div>

      <div className="resume-field linkedin-field">
        <label className="resume-label">LinkedIn</label>
        <input className="resume-input linkedin-input" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
      </div>

      <div className="resume-field pdf-url-field">
        <label className="resume-label">PDF URL</label>
        <input className="resume-input pdf-url-input" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} />
      </div>
    </div>

    <h3 className="resume-parts-title">Resume Parts</h3>
    {parts.map((part, pIndex) => (
      <div key={pIndex} className="part-section unique-part-section">
        <div className="part-field part-title-field">
          <label className="part-label">Part Title*</label>
          <input className="part-input part-title-input" value={part.title} onChange={(e) => handlePartChange(pIndex, "title", e.target.value)} required />
        </div>
        <div className="part-field part-order-field">
          <label className="part-label">Order Index</label>
          <input className="part-input part-order-input" type="number" value={part.order_index} onChange={(e) => handlePartChange(pIndex, "order_index", e.target.value)} />
        </div>

        <h4 className="sub-parts-title">Sub Parts</h4>
        {part.sub_parts.map((sub, sIndex) => (
          <div key={sIndex} className="sub-part unique-sub-part">
            <input className="sub-part-input name-input" placeholder="Name" value={sub.name} onChange={(e) => handleSubPartChange(pIndex, sIndex, "name", e.target.value)} />
            <input className="sub-part-input location-input" placeholder="Location" value={sub.location} onChange={(e) => handleSubPartChange(pIndex, sIndex, "location", e.target.value)} />
            <textarea className="sub-part-textarea description-input" placeholder="Description (JSON or text)" value={sub.description} onChange={(e) => handleSubPartChange(pIndex, sIndex, "description", e.target.value)} />
            <input className="sub-part-input start-date-input" placeholder="Start Date" value={sub.start_date} onChange={(e) => handleSubPartChange(pIndex, sIndex, "start_date", e.target.value)} />
            <input className="sub-part-input end-date-input" placeholder="End Date" value={sub.end_date} onChange={(e) => handleSubPartChange(pIndex, sIndex, "end_date", e.target.value)} />
            <input className="sub-part-input order-id-input" type="number" placeholder="Order ID" value={sub.order_id} onChange={(e) => handleSubPartChange(pIndex, sIndex, "order_id", e.target.value)} />
          </div>
        ))}
        <button type="button" className="add-sub-part-btn" onClick={() => addSubPart(pIndex)}>+ Add Sub Part</button>
      </div>
    ))}
    <button type="button" className="add-part-btn" onClick={addPart}>+ Add Part</button>

    <button type="submit" className="submit-resume-btn">Submit Resume</button>
  </form>
</div>
  );
};

export default AddResume;