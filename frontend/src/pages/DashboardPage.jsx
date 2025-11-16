/*import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="dash-header">
        <h1>Algorithm Visualizer Dashboard</h1>
        <p>Step inside to explore how algorithms find the shortest path intelligently.</p>
      </div>

      <div className="dash-svg">*/
        {/* 🌐 Animated Graph SVG */}
        /*<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="90" r="8" fill="#61dafb">
            <animate attributeName="fill" values="#61dafb;#0dcaf0;#61dafb" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="50" r="8" fill="#0dcaf0">
            <animate attributeName="fill" values="#0dcaf0;#20c997;#0dcaf0" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </circle>
          <circle cx="250" cy="130" r="8" fill="#20c997">
            <animate attributeName="fill" values="#20c997;#ffc107;#20c997" dur="2s" repeatCount="indefinite" begin="0.6s" />
          </circle>
          <circle cx="350" cy="90" r="8" fill="#ffc107">
            <animate attributeName="fill" values="#ffc107;#dc3545;#ffc107" dur="2s" repeatCount="indefinite" begin="0.9s" />
          </circle>

          <line x1="50" y1="90" x2="150" y2="50" stroke="#999" strokeWidth="2">
            <animate attributeName="stroke" values="#999;#61dafb;#999" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="150" y1="50" x2="250" y2="130" stroke="#999" strokeWidth="2">
            <animate attributeName="stroke" values="#999;#20c997;#999" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </line>
          <line x1="250" y1="130" x2="350" y2="90" stroke="#999" strokeWidth="2">
            <animate attributeName="stroke" values="#999;#ffc107;#999" dur="2s" repeatCount="indefinite" begin="0.6s" />
          </line>
        </svg>
      </div>

      <div className="dash-card">
        <h2>🧠 Start Visualization</h2>
        <p>Watch algorithms like BFS, DFS, and A* search solve complex pathfinding challenges in real time.</p>
        <Link to="/visualizer" className="start-btn">
          Launch Visualizer →
        </Link>
      </div>

      <Link to="/" className="back-btn">← Back to Home</Link>
    </div>
  );
};

export default DashboardPage;
*/
import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="logo-title">🧭 AlgoTracer</h1>
        <p className="tagline">Visualizing Intelligence in Pathfinding Algorithms</p>
      </header>

      <main className="dashboard-main">
        <section className="intro-card glass">
          <h2>Welcome to AlgoTracer</h2>
          <p>
            A visual journey into how algorithms like <b>BFS</b>, <b>DFS</b>, <b>Dijkstra</b>, and <b>A*</b> 
            navigate through mazes to find the shortest path — step by step, cell by cell.
          </p>

          <div className="animated-graph">
            <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
              <line x1="50" y1="90" x2="150" y2="50" stroke="#00d1ff" strokeWidth="2" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="150" y1="50" x2="250" y2="130" stroke="#00ffcc" strokeWidth="2" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.3s" />
              </line>
              <line x1="250" y1="130" x2="350" y2="90" stroke="#ffc107" strokeWidth="2" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.6s" />
              </line>

              <circle cx="50" cy="90" r="8" fill="#00d1ff" />
              <circle cx="150" cy="50" r="8" fill="#20c997" />
              <circle cx="250" cy="130" r="8" fill="#ffc107" />
              <circle cx="350" cy="90" r="8" fill="#ff4d6d" />
            </svg>
          </div>

          <Link to="/visualizer" className="launch-btn">
            🚀 Launch Visualizer
          </Link>
        </section>

        <section className="info-grid">
          <div className="info-box glass">
            <h3>🎯 Purpose</h3>
            <p>Learn visually how graph-search algorithms traverse nodes, discover paths, and optimize decisions.</p>
          </div>
          <div className="info-box glass">
            <h3>🧠 Algorithms</h3>
            <p>BFS • DFS • Dijkstra • A* • Greedy Best-First Search</p>
          </div>
          <div className="info-box glass">
            <h3>⚙️ Tech Stack</h3>
            <p>React, Flask, Python, CORS, Fetch API</p>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>Developed by <b> Git Guild </b> • PBL Project 2025</p>
        <Link to="/" className="home-link">← Back to Home</Link>
      </footer>
    </div>
  );
};

export default DashboardPage;
