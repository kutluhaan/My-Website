import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/admin/get-admin");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};
