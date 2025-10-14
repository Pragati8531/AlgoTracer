import React from "react";

const AlgorithmSelector = ({ algorithms = [], selectedAlgorithm, onAlgorithmChange }) => {
  return (
    <div className="controls-container algorithm-selector">
      <h3>Select Algorithm</h3>
      <select
        className="algorithm-dropdown"
        value={selectedAlgorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
      >
        {algorithms.length > 0 ? (
          algorithms.map((algo) => (
            <option key={algo.id} value={algo.id}>
              {algo.name}
            </option>
          ))
        ) : (
          <option disabled>No algorithms available</option>
        )}
      </select>
    </div>
  );
};

export default AlgorithmSelector;
