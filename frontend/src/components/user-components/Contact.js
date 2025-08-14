import { useState, useContext } from "react";
import LiquidChrome from "./react-bits/LiquidChrome";
import { AdminContext } from "../../contexts/AdminContext";
import "./Contact.css";
import GlassIcons from "./react-bits/GlassIcons";

import { FaInstagram, FaSquareGithub, FaLinkedin, FaSpotify } from "react-icons/fa6";
import { TbBrandLeetcode } from "react-icons/tb";
import { SiHackerrank } from "react-icons/si";

const Contact = () => {
  const { admin, loading, error } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [buttonText, setButtonText] = useState("Send Message");
  const [buttonColor, setButtonColor] = useState("#fff"); // Default white

  if (loading) return <div>Loading admin info...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    setButtonColor("#fff"); // neutral while sending

    try {
      const response = await fetch("http://127.0.0.1:5000/api/mail/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setButtonText("Message Sent");
        setButtonColor("#4CAF50"); // green
        setFormData({ name: "", email: "", message: "" });
      } else {
        setButtonText("Failed to Send");
        setButtonColor("#FF4C4C"); // red
      }
    } catch (err) {
      setButtonText("Failed to Send");
      setButtonColor("#FF4C4C"); // red
    } finally {
      // Revert to default after 1.3s
      setTimeout(() => {
        setButtonText("Send Message");
        setButtonColor("#fff");
      }, 1300);
    }
  };

  const items = [
    { icon: <FaInstagram />, color: 'gray', label: 'Instagram', url: admin.instagram_url },
    { icon: <FaLinkedin />, color: 'gray', label: 'LinkedIn', url: admin.linkedin_url },
    { icon: <FaSquareGithub />, color: 'gray', label: 'GitHub', url: admin.github_url },
    { icon: <TbBrandLeetcode />, color: 'gray', label: 'LeetCode', url: admin.leetcode_url },
    { icon: <SiHackerrank />, color: 'gray', label: 'HackerRank', url: admin.hackerrank_url },
    { icon: <FaSpotify />, color: 'gray', label: 'Spotify', url: admin.spotify_url },
  ];

  return (
    <section className="contact-section" id="contact">
      <LiquidChrome
        baseColor={[0.05, 0.05, 0.05]}
        speed={0.15}
        amplitude={0.25}
        frequencyX={3}
        frequencyY={3}
        interactive={false}
      />
      <div className="contact-overlay">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-title">Contact</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="contact-submit-button"
            style={{ color: buttonColor, transition: "all 0.3s ease-in-out" }}
          >
            {buttonText}
          </button>
        </form>
        <GlassIcons items={items} className="glass-icons-container custom-class" />
      </div>
    </section>
  );
};

export default Contact;
