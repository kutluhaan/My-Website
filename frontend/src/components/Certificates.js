import { useContext, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./Certificates.css";
import { CertificatesContext } from "../contexts/CertificatesContext";
import LetterGlitch from "./react-bits/LetterGlitch";

const Certificates = () => {
  const { certificates, loading, error } = useContext(CertificatesContext);

  useEffect(() => {
    if (!loading && certificates.length > 0) {
      console.log("Certificates:", certificates);
    }
  }, [certificates, loading]);

  if (loading) {
    return <div className="certificates-loading">Loading certificates...</div>;
  }

  if (error) {
    return <div className="certificates-error">Error: {error}</div>;
  }

  return (
    <div className="certificates-grid-container">

      {certificates.map((cert) => (
        <div className="certificate-card" key={cert.id}>
          {cert.image_url && (
            <img
              src={cert.image_url}
              alt={cert.title}
              className="certificate-image"
            />
          )}
          <div className="certificate-content">
            <h2 className="certificate-title">{cert.title}</h2>
            <p className="certificate-issuer">{cert.issuer}</p>
            <p className="certificate-date">
              {new Date(cert.issue_date).toLocaleDateString()}{" "}
              {cert.expiration_date &&
                `- ${new Date(cert.expiration_date).toLocaleDateString()}`}
            </p>
            {cert.category && (
              <span className="certificate-category">{cert.category}</span>
            )}
            {cert.description && (
              <p className="certificate-description">{cert.description}</p>
            )}
            {cert.file_url && (
              <a
                href={cert.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-link"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificates;
