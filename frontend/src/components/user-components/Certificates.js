import { useContext, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./Certificates.css";
import { CertificatesContext } from "../../contexts/CertificatesContext";

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
      <h2 className="certificate-section-title">CERTIFICATES</h2>
      <div className="certificates-grid">
        {certificates.map((cert) => (
          <div className="certificate-card" key={cert.id}>
            {cert.image_url && (
              <div className="certificate-image-wrapper">
                <img
                  src={cert.image_url}
                  alt={cert.title}
                  className="certificate-image"
                />
                {cert.file_url && (
                  <a
                    href={cert.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-link-icon"
                  >
                    <FaExternalLinkAlt style={{backgroundColor:"transparent"}} />
                  </a>
                )}
              </div>
            )}

            <div className="certificate-content">
              <h2 className="certificate-title">{cert.title}</h2>
              <p className="certificate-issuer">
                {cert.issuer} –
                {cert.category && (
                  <span className="certificate-category">{cert.category}</span>
                )}
              </p>

              {cert.description && (
                <p className="certificate-description">{cert.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
