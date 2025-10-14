import React from 'react';
import AlgorithmSelector from './AlgorithmSelector';
import StatsPanel from './StatsPanel';
import '../styles/Controls.css';

const ControlsComponent = ({ 
  selectedAlgorithm, 
  onAlgorithmChange,
  onVisualize,
  onClearGrid,
  onClearPath,
  onGenerateMaze,
  isVisualizing,
  stats,
  algorithms 
}) => {
  return (
    <div className="controls-container">
      <h3>Algorithm Controls</h3>
      
      <AlgorithmSelector
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={onAlgorithmChange}
        algorithms={algorithms}
      />
      
      <div className="control-buttons">
        <button 
          onClick={onVisualize}
          disabled={isVisualizing}
          className={`btn-primary ${isVisualizing ? 'loading' : ''}`}
        >
          {isVisualizing ? 'Visualizing...' : `Run ${selectedAlgorithm.toUpperCase()}`}
        </button>
        
        <button onClick={onClearPath} disabled={isVisualizing} className="btn-secondary">
          Clear Path
        </button>
        
        <button onClick={onClearGrid} disabled={isVisualizing} className="btn-secondary">
          Clear Grid
        </button>
        
        <button onClick={onGenerateMaze} disabled={isVisualizing} className="btn-secondary">
          Generate Maze
        </button>
      </div>
      
      <StatsPanel stats={stats} algorithm={selectedAlgorithm} />
      
      <div className="instructions">
        <h4>Instructions:</h4>
        <ul>
          <li>Click to place/remove walls</li>
          <li>Drag to draw multiple walls</li>
          <li>Select algorithm and click visualize</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlsComponent;
