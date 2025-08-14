// galaxy, silk, thread, letter glitch -> background
// magic bento, circular gallery, tilted card, chroma grid, spotlight card -> certificate
// gooey nav -> navigation
// tilted card, lanyard, profile card, spotlight card -> profile
// glass icons -> social media or footer
// flowing menu -> menu


// animated content -> may be used for cards
// fade content -> may be used for cards
// glare hover -> may be used for buttons and cards
// cubes -> to have a good display
// metallic paint -> for my logo
// splash cursor -> for the cursor
// star border -> for buttons

// text trail -> for the text
// decrypted text -> for the text
// true focus -> for the text
// scroll reveal -> for the text
// scroll velocity -> for the text


import Silk from "./components/react-bits/Silk";
import ScrollVelocity from "./components/react-bits/ScrollVelocity";
import TrueFocus from "./components/react-bits/TrueFocus";
import Navbar from "./components/Navbar";
import Trapezoid from "./components/Trapezoid";
import "./App.css";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

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
