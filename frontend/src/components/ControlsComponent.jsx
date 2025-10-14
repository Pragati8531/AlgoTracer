import React from 'react';
import StatsPanel from './StatsPanel';
import '../styles/Controls.css';

const ControlsComponent = ({
  // algorithm selector props
  selectedAlgorithm = 'dijkstra',
  onAlgorithmChange = () => {},

  // visualization control props
  isVisualizing = false,
  onVisualize = () => {},
  onClearGrid = () => {},
  onClearPath = () => {},
  onGenerateMaze = () => {}
}) => {
  return (
    <div className="controls-wrapper">
      <div className="controls-container control-buttons">
        <div className="controls-row">
          <label htmlFor="algorithm-select" className="label">
            Algorithm:
          </label>
          <select
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(e.target.value)}
            disabled={isVisualizing}
            className="algorithm-select"
          >
            <option value="dijkstra">Dijkstra</option>
            <option value="astar">A*</option>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
          </select>
        </div>

        <button
          className={`btn-primary ${isVisualizing ? 'loading' : ''}`}
          onClick={onVisualize}
          disabled={isVisualizing}
        >
          {isVisualizing ? 'Visualizing...' : 'Visualize'}
        </button>

        <button className="btn-secondary" onClick={onClearGrid} disabled={isVisualizing}>
          Clear Grid
        </button>

        <button className="btn-secondary" onClick={onClearPath} disabled={isVisualizing}>
          Clear Path
        </button>

        <button className="btn-secondary" onClick={onGenerateMaze} disabled={isVisualizing}>
          Generate Maze
        </button>
      </div>

      <div className="stats-panel-wrapper">
        <StatsPanel />
      </div>
    </div>
  );
};

export default ControlsComponent;
