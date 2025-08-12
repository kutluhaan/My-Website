import "./Trapezoid.css";
import React, { useContext, useEffect } from "react";
import DecryptedText from "./react-bits/DecryptedText";
import GlassIcons from "./react-bits/GlassIcons";
import logo from "../assets/no-bg-logo.png";
import { FaInstagram, FaSquareGithub, FaLinkedin, FaSpotify } from "react-icons/fa6";
import { TbBrandLeetcode } from "react-icons/tb";
import { SiHackerrank } from "react-icons/si";
import { AdminContext } from "../contexts/AdminContext";

function Trapezoid() {

    const { admin, loading, error } = useContext(AdminContext);

    if (loading) return <div>Loading admin info...</div>;
    if (error) return <div>Error: {error}</div>;


    const items = [
    { icon: <FaInstagram />, color: 'gray', label: 'Instagram', url: admin.instagram_url },
    { icon: <FaLinkedin />, color: 'gray', label: 'LinkedIn', url: admin.linkedin_url },
    { icon: <FaSquareGithub />, color: 'gray', label: 'GitHub', url: admin.github_url },
    { icon: <TbBrandLeetcode />, color: 'gray', label: 'LeetCode', url: admin.leetcode_url },
    { icon: <SiHackerrank />, color: 'gray', label: 'HackerRank', url: admin.hackerrank_url },
    { icon: <FaSpotify />, color: 'gray', label: 'Spotify', url: admin.spotify_url },
    ];

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

                <GlassIcons items={items} className="custom-class"/>

            
            </div>
        </div>

        <div className="trapezoid-photo-container">
        <img
            src={admin.profile_photo_url} // Fallback if photo_url is not available
            alt="Kutluhan"
            className="trapezoid-photo"
        />
        </div>
    </div>
  );
}

export default Trapezoid;
