import React from 'react';

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange, algorithms }) => {
  return (
    <div className="algorithm-selector">
      <label>Select Pathfinding Algorithm:</label>
      <select 
        value={selectedAlgorithm} 
        onChange={(e) => onAlgorithmChange(e.target.value)}
        className="algorithm-dropdown"
      >
        {algorithms.map(algo => (
          <option key={algo.id} value={algo.id}>
            {algo.name}
          </option>
        ))}
      </select>
      
      {algorithms.find(algo => algo.id === selectedAlgorithm)?.description && (
        <div className="algorithm-description">
          {algorithms.find(algo => algo.id === selectedAlgorithm).description}
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelector;
