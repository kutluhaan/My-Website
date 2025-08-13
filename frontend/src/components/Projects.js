import { useContext, useRef } from "react";
import "./Projects.css";
import { ProjectsContext } from "../contexts/ProjectContext"; 
import VariableProximity from "./react-bits/VariableProximity";
import GlareHover from "./react-bits/GlareHover";
import Carousel from "./react-bits/Carousel";
import LetterGlitch from "./react-bits/LetterGlitch";
import SplitText from "./react-bits/SplitText";
import TextType from "./react-bits/TextType";


const Projects = () => {
  const { projects, loading, error } = useContext(ProjectsContext);

  const containerRef = useRef(null);

  if (loading) return <div>Loading admin info...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
        <div className="letter-glitch-background">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>
        <div className="projects-content">
          <div className="var-pro-text">
            <VariableProximity
                label={"PROJECTS"}
                className={"variable-proximity-demo"}
                fromFontVariationSettings={"'wght' 400, 'opsz' 9"}
                toFontVariationSettings={"'wght' 1000, 'opsz' 40"}
                containerRef={containerRef}
                radius={100}
                falloff="linear" 
            /> 
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card-container" key={project.id}>
              <GlareHover
                key={project.id}
                width= "1300px"      // match image width
                height="450px"     // match image height
                background="#000000ff"
                borderRadius="10px"
                borderColor="#ccc"
                glareColor="#ffffff"
                glareOpacity={0.5}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={2000}
                playOnce={true}
                className="project-card-glare">
                <div className="project-card">
                <Carousel
                  items={
                    project.images
                      ? project.images.map((img, index) => ({
                          title: project.title,
                          description: "",
                          id: index,
                          icon: (
                            <img
                              src={img}
                              alt={`${project.title} ${index + 1}`}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ),
                        }))
                      : []
                  }
                  baseWidth={700}
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
                <div className="project-card-text-container">
                  <div className="project-card-title">
                      <SplitText
                      text={project.title}
                      className="text-2xl font-semibold text-center"
                      delay={100}
                      duration={1.2}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="-100px"
                      textAlign="center"
                    />
                  </div>
                  <div className="project-card-text">
                    <TextType 
                    text={[project.description]}
                    typingSpeed={30}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="_"
                  />
                  </div>
                  
                  </div>
                </div>
              </GlareHover>
            </div>

          ))}
        </div>
        </div>
    </section>
  );
};

export default Projects;