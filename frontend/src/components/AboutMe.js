import Cubes from "./react-bits/Cubes";
import SplitText from "./react-bits/SplitText";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <section className="about-me-section" id="about">
      <div className="cubes">
         <Cubes 
          gridSize={12}
          maxAngle={60}
          radius={3}
          borderStyle="0.5px dashed #f5f5f5ff"
          faceColor="#1a1a2e"
          rippleColor="#f5f1a0ff"
          rippleSpeed={1.5}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>

      <div className="about-me-content">
        <h2>About Me</h2>

        <div className="contact-info">
          <p><strong>Kutluhan Aygüzel</strong></p>
          <p>+90 553 520 3137 | <a href="mailto:kutluhan@sabanciuniv.edu">kutluhan@sabanciuniv.edu</a> | <a href="https://yourwebsite.com" target="_blank" rel="noreferrer">Website</a> | <a href="https://github.com/yourgithub" target="_blank" rel="noreferrer">GitHub</a></p>
        </div>

        <div className="about-section">
          <h3>Education</h3>
          <p><strong>Sabancı University | Istanbul, Turkey (2020-2025)</strong></p>
          <ul>
            <li>Graduated with B.S. in Computer Science and Engineering</li>
            <li>CGPA: 3.38/4.00</li>
            <li>50% scholarship based on University Entrance Exam</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>Experience</h3>
          <h4>AI/ML Engineer Intern – GT-ARC Gemeinnützge GmbH, Berlin, Germany (July-Sep 2024)</h4>
          <ul>
            <li>Integrated ChatGPT API into an educational web UI, providing users a consistent chatbot system.</li>
            <li>Built a text-to-video model combining various open-source tools inside a Python-based system.</li>
            <li>Developed a Vue quiz app and integrated a Llama 3 chatbot connected to the website.</li>
          </ul>

          <h4>Learning Assistant - Sabancı University CS 201 Course (Feb-June 2023)</h4>
          <ul>
            <li>Assisted students in C++ programming, collaborating with academicians to improve course content.</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>Course Projects</h3>
          <h4>Graduation Project: AI/ML Based Trading Bot for Stock Exchange (Sep 2024 - Jan 2025)</h4>
          <ul>
            <li>Developed a full-stack website integrating ML models predicting BIST30 stock prices using 10 years of historical data.</li>
            <li>Enabled users to link investment accounts, execute trades, run bots, and apply strategies using React.js, Flask, and Docker.</li>
            <li>Applied feature engineering and implemented feedforward neural networks with hyperparameter tuning.</li>
            <li>Scraped financial news and applied sentiment analysis using finBERT to improve model learning.</li>
            <li>Achieved 70.80% accuracy and simulated 14195.49% profit in buy/sell order simulations.</li>
          </ul>

          <h4>Software Engineering Course: Wellmarkt E-Commerce Website (Sep 2024 - Jan 2025)</h4>
          <ul>
            <li>Led Scrum team as Scrum Master for a wellness product e-commerce platform.</li>
            <li>Developed secure full-stack web app using React.js, Java Spring Boot, and MongoDB with real-time inventory and admin tools.</li>
            <li>Implemented product search, order processing, and customer review moderation.</li>
            <li>Ensured software quality via unit testing and continuous deployment.</li>
          </ul>
        </div>

        {/* Add other sections similarly: Network Science, Data Science, Mobile App, Extracurriculars, etc. */}

      </div>
    </section>
  );
};

export default AboutMe;