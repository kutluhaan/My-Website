import Cubes from "./react-bits/Cubes";
import React, { useContext } from "react";
import "./AboutMe.css";
import { AdminContext } from "../../contexts/AdminContext";
import GradientText from "./react-bits/GradientText";
import ScrambledText from "./react-bits/ScrambledText";

const AboutMe = () => {

    const { admin, loading, error } = useContext(AdminContext);

    if (loading) return <div>Loading admin info...</div>;
    if (error) return <div>Error: {error}</div>;

const sentences = admin.about
    ? admin.about.match(/[^.!?]+[.!?]+/g) || [admin.about]
    : [];


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
        <GradientText
        colors={["#2f2f2fff", "#7c7c7cff", "#ffffffff", "#7c7c7cff", "#2f2f2fff"]}
        animationSpeed={4}
        className="custom-class"
      >
        About Me!
      </GradientText>
      {sentences.map((sentence, index) => (
        <ScrambledText
          key={index}                 // always add a key when mapping!
          className="scrambled-text-demo"
          radius={80}
          duration={1.2}
          speed={0.5}
          scrambleChars={".:"}
        >
          {sentence.trim()}
        </ScrambledText>
      ))}
      </div>
      
    </section>
    
  );
};

export default AboutMe;