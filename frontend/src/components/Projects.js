import { useContext, useRef } from "react";
import "./Projects.css";
import { ProjectsContext } from "../contexts/ProjectContext"; 
import VariableProximity from "./react-bits/VariableProximity";
import GlareHover from "./react-bits/GlareHover";
import Carousel from "./react-bits/Carousel";
import Galaxy from "./react-bits/Galaxy";

const Projects = () => {
  const { projects, loading, error } = useContext(ProjectsContext);

  const containerRef = useRef(null); // define the ref here

  if (loading) return <div>Loading admin info...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
        <div className="galaxy-background">
          <Galaxy mouseRepulsion={false}/>
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
              width="300px"
              height="400px"
              background="#000000ff"
              borderRadius="10px"
              borderColor="#ccc"
              glareColor="#ffffff"
              glareOpacity={0.5}
              glareAngle={-45}
              glareSize={250}
              transitionDuration={650}
              playOnce={false}
              className="project-card-glare">
                <div className="project-card">
            <Carousel
              items={
                project.images
                  ? project.images.map((img, index) => ({
                      title: project.title,
                      description: "", // or project.description if you want text
                      id: index,
                      icon: (
                        <img
                          src={img}
                          alt={`${project.title} ${index + 1}`}  // <-- fixed here with backticks
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ),
                    }))
                  : []
              }
              baseWidth={300}
              autoplay={false}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />


              <p>{project.description}</p>


              
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