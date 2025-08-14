import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectOpsSelection = () => {
  const navigate = useNavigate();
  const [operation, setOperation] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!operation) return;

    if (operation === "add") {
      navigate("/admin/project-ops/add-new");
    } else if (operation === "update") {
      if (!id) return alert("Please enter a Project ID to update.");
      navigate(`/admin/project-ops/update/${id}`);
    } else if (operation === "delete") {
      if (!id) return alert("Please enter a Project ID to delete.");
      navigate(`/admin/project-ops/delete/${id}`);
    } else if (operation === "get") {
      navigate("/admin/project-ops/get-projects");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Project Operations</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Select Operation:</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Choose an Operation --</option>
          <option value="add">Add Project</option>
          <option value="update">Update Project</option>
          <option value="delete">Delete Project</option>
          <option value="get">Get Projects</option>
        </select>

        {(operation === "update" || operation === "delete") && (
          <>
            <label style={styles.label}>Enter Project ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={styles.input}
              placeholder="Project ID"
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

export default ProjectOpsSelection;