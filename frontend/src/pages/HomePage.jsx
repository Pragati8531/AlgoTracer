import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  // Allow pressing Enter to continue
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        navigate("/dashboard");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="gif-container">
        {/* 👨‍💻 Animated Programmer GIF */}
        <img
          src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
          alt="Programmer Animation"
          className="programmer-gif"
        />
      </div>

      <div className="home-content">
        <h1 className="welcome-title">Welcome to <span>AlgoTracer</span></h1>
        <p className="welcome-tagline">
          Visualize algorithms in action — understand the logic, not just the code.
        </p>
        <p className="press-enter">Press <span>Enter</span> to Continue ↵</p>
      </div>
    </div>
  );
};

export default HomePage;
