import "./Trapezoid.css";
import DecryptedText from "./react-bits/DecryptedText";
import logo from "../assets/no-bg-logo.png";


function Trapezoid() {
  return (
    <div className="trapezoid-section" id="home">    
        <div className="trapezoid-content">
            <div className="trapezoid-logo">
                <img src={logo} alt="Logo" className="trapezoid-logo-image" />
            </div>
            <div className="trapezoid-decrypt-text">
                <DecryptedText
                    text="Hello!"
                    speed={100}        // lower = slower decryption effect
                    revealDirection="start" // or 'left' / 'right'
                    className="decrypted-text-greeting"
                    animateOn="hover"
                    encryptedClassName="encrypted-text-greeting"
                />
                <DecryptedText
                    text="I'm Kutluhan."
                    speed={100}        // lower = slower decryption effect
                    revealDirection="start" // or 'left' / 'right'
                    className="decrypted-text"
                    animateOn="hover"
                    encryptedClassName="encrypted-text"
                />
                <DecryptedText
                    text="I'm a developer."
                    speed={100}        // lower = slower decryption effect
                    revealDirection="start" // or 'left' / 'right'
                    className="decrypted-text"
                    animateOn="hover"
                    encryptedClassName="encrypted-text"
                />
            </div>
        </div>

        <div className="trapezoid-photo-container">
            <img src="https://drive.google.com/uc?export=view&id=1cdr6hr-abJFO0f_1oq9cZgJBvR-yvxnd" alt="Kutluhan" className="trapezoid-photo" />
        </div>
    </div>
  );
}

export default Trapezoid;
