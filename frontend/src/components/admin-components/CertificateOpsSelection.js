import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CertificateOpsSelection = () => {
  const navigate = useNavigate();
  const [operation, setOperation] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!operation) return;

    if (operation === "add") {
      navigate("/admin/certificate-ops/add-new");
    } else if (operation === "update") {
      if (!id) return alert("Please enter a Certificate ID to update.");
      navigate(`/admin/certificate-ops/update/${id}`);
    } else if (operation === "delete") {
      if (!id) return alert("Please enter a Certificate ID to delete.");
      navigate(`/admin/certificate-ops/delete/${id}`);
    } else if (operation === "get") {
      navigate("/admin/certificate-ops/get-certificates");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Certificate Operations</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Select Operation:</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Choose an Operation --</option>
          <option value="add">Add Certificate</option>
          <option value="update">Update Certificate</option>
          <option value="delete">Delete Certificate</option>
          <option value="get">Get Certificates</option>
        </select>

        {(operation === "update" || operation === "delete") && (
          <>
            <label style={styles.label}>Enter Certificate ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={styles.input}
              placeholder="Certificate ID"
            />
          </>
        )}

        <button type="submit" style={styles.button}>Go</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "bold",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CertificateOpsSelection;
