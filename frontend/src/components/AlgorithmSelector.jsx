import React from "react";

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange, algorithms }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Select an Algorithm:</h3>
      <select
        value={selectedAlgorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      >
        {algorithms.map((algo) => (
          <option key={algo.id} value={algo.id}>
            {algo.name}
          </option>
        ))}
      </select>

      <p style={{ marginTop: "10px", color: "#555" }}>
        {algorithms.find((a) => a.id === selectedAlgorithm)?.description}
      </p>
    </div>
  );
};

export default AlgorithmSelector;
