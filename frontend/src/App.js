import Silk from "./components/user-components/react-bits/Silk";
import ScrollVelocity from "./components/user-components/react-bits/ScrollVelocity";
import TrueFocus from "./components/user-components/react-bits/TrueFocus";
import Navbar from "./components/user-components/Navbar";
import Trapezoid from "./components/user-components/Trapezoid";
import "./App.css";
import AboutMe from "./components/user-components/AboutMe";
import Projects from "./components/user-components/Projects";
import Resume from "./components/user-components/Resume";
import Certificates from "./components/user-components/Certificates";
import Contact from "./components/user-components/Contact";

function App() {

  return (
    <div className="App">
      {/* Background */}
      <div className="background-container">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={50}
        />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="content">
        <Trapezoid />
        <ScrollVelocity
            scrollContainerRef={null}
            texts={["CODING   -   SOFTWARE", "ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING   -   WEB DEVELOPMENT"]}
            velocity={100}
            className="scroll-velocity"
            numCopies={6}
            velocityMapping={{ input: [0, 1000], output: [0, 5] }}
            parallaxClassName="parallax"
            scrollerClassName="scroller"
        />
        <AboutMe />
        {/*<Projects />*/}
        <TrueFocus 
        sentence="MY RESUME"
        manualMode={false}
        blurAmount={5}
        borderColor="white"
        animationDuration={2}
        pauseBetweenAnimations={1}
        />
        <Resume />
        <Certificates />
        <Contact/>
      </div>
    </div>
  );
}

export default App;
