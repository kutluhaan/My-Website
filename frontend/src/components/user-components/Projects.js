import { useContext, useRef } from "react";
import "./Projects.css";
import { ProjectsContext } from "../../contexts/ProjectContext"; 
import Carousel from "./react-bits/Carousel";
import SplitText from "./react-bits/SplitText";
import TextType from "./react-bits/TextType";
import TextPressure from "./react-bits/TextPressure";
import Beams from "./react-bits/Beams";
import StarBorder from "./react-bits/StarBorder";

const Projects = () => {
  const { projects, loading, error } = useContext(ProjectsContext);
  const containerRef = useRef(null);

  if (loading) return <div>Loading admin info...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
      <div className="projects-content">
        <div className="var-pro-text">
          <TextPressure
            text="PROJECTS"
            flex={true}
            alpha={true} 
            stroke={true}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#39014cff"
            minFontSize={36}
          />
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <StarBorder
              key={project.id}
              className="project-card-star-border"
              color="white"
              thickness={7}
              speed="8s"
            >
              <div className="project-card">
                {/* Beams background */}
                <div className="project-card-beams">
                  <Beams
                    beamWidth={5}
                    beamHeight={25}
                    beamNumber={5}
                    lightColor="#ffffff"
                    speed={8}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={150}
                  />
                </div>

                {/* Carousel */}
                <div className="project-card-carousel">
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
                </div>

                {/* Text content */}
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
            </StarBorder>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
