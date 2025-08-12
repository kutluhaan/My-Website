import ShinyText from "./react-bits/ShinyText"; // Adjust path based on CLI output
import "./Navbar.css";

function Navbar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-items">
        <div className="nav-item" onClick={() => scrollToSection("home")}>
          <ShinyText text="Home" disabled={false} speed={3} />
        </div>
        <div className="divider"></div>
        <div className="nav-item" onClick={() => scrollToSection("about")}>
          <ShinyText text="About Me" disabled={false} speed={3} />
        </div>
        <div className="divider"></div>
        <div className="nav-item" onClick={() => scrollToSection("contact")}>
          <ShinyText text="Contact" disabled={false} speed={2} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
