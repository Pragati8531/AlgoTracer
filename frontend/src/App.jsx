import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the pages
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import VisualizerPage from "./pages/VisualizerPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Visualizer page */}
        <Route path="/visualizer" element={<VisualizerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
