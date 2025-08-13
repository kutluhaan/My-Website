import React, { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext({
  resume: null,
  loading: true,
  error: null,
});

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/resume/get-resume")// Adjust your API URL here
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResume(data);
      } catch (err) {
        setError(err.message || "Failed to fetch resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  return (
    <ResumeContext.Provider value={{ resume, loading, error }}>
      {children}
    </ResumeContext.Provider>
  );
};