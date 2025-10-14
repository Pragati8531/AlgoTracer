import React from "react";

const StatsPanel = ({ stats, algorithm }) => {
  if (!stats) {
    return (
      <div className="stats-panel">
        <h4>Performance Metrics</h4>
        <p>Run an algorithm to see statistics</p>
      </div>
    );
  }

  return (
    <div className="stats-panel">
      <h4>Algorithm Performance</h4>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Algorithm:</span>
          <span className="stat-value">{algorithm.toUpperCase()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Path Length:</span>
          <span className="stat-value">{stats.distance}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time Taken:</span>
          <span className="stat-value">{stats.time} ms</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Nodes Explored:</span>
          <span className="stat-value">{stats.nodesExplored}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Status:</span>
          <span className={`stat-value ${stats.path.length > 0 ? 'success' : 'error'}`}>
            {stats.path.length > 0 ? 'Path Found' : 'No Path'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
