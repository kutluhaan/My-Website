import { createContext, useContext, useEffect, useState } from "react";

export const CertificatesContext = createContext();

export const CertificatesProvider = ({ children }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/certificates/all`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch certificates");
        return res.json();
      })
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <CertificatesContext.Provider value={{ certificates, loading, error }}>
      {children}
    </CertificatesContext.Provider>
  );
};

export const useCertificates = () => useContext(CertificatesContext);