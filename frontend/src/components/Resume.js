import { useContext } from "react";
import { ResumeContext } from "../contexts/ResumeContext";
import "./Resume.css";
import { MdOpenInNew } from "react-icons/md";

const Resume = () => {
  const { resume, loading, error } = useContext(ResumeContext);

  
  if (loading) return <p className="loading">Loading resume...</p>;
  if (error) return <p className="error">Error loading resume: {error}</p>;
  if (!resume) return <p>No resume data available.</p>;



  // Replace this with your actual resume PDF URL
  const resumePdfUrl = resume.pdf_url;

  const openPdf = () => {
    window.open(resumePdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="resume-container">
      <section className="resume-section">
        <header className="resume-header">
          <button className="download-pdf-btn" onClick={openPdf}>
            <MdOpenInNew size={30} />
          </button>
          <h1 className="owner-name">{resume.owner_name}</h1>


          <div className="contact-info">
            {resume.email && <a href={`mailto:${resume.email}`}>{resume.email}</a>}
            {resume.phone && <span>{resume.phone}</span>}
            {resume.website && (
              <a href={resume.website} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            )}
            {resume.github && (
              <a href={resume.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {resume.linkedin && (
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </header>

        <div className="resume-parts">
          {resume.parts
            .sort((a, b) => a.order_id - b.order_id)
            .map((part) => (
                
              <section key={part.id} className="resume-part">
                <h2 className="part-title">{part.title}</h2>
                <div className="sub-parts">
                  {part.sub_parts
                  .sort((a, b) => a.order_id - b.order_id) // <-- sort by order_id
                  .map((sub) => (
                    <article key={sub.id} className="sub-part">
                      <header className="sub-part-header">
                        <h3 className="sub-part-name">{sub.name}</h3>
                        {sub.location && <span className="sub-part-location">{sub.location}</span>}
                        {(sub.start_date || sub.end_date) && (
                          <time className="sub-part-dates">
                            {sub.start_date}
                            {sub.end_date ? ` - ${sub.end_date}` : ""}
                          </time>
                        )}

                      </header>
                      {sub.description && Array.isArray(sub.description) && (
                        <ul className="description-list">
                          {sub.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                      )}
                      {sub.description && typeof sub.description === "string" && (
                        <p className="description-text">{sub.description}</p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Resume;
