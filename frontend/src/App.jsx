 import React, { useState } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector';
import ControlsComponent from './components/ControlsComponent';
import GridComponent from './components/GridComponent';
import StatsPanel from './components/StatsPanel';
import './styles/Controls.css';

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [isVisualizing, setIsVisualizing] = useState(false);

  const algorithms = [
    { id: 'dijkstra', name: 'Dijkstra', description: 'Finds the shortest path.' },
    { id: 'astar', name: 'A*', description: 'An informed search algorithm using heuristics.' },
    { id: 'bfs', name: 'BFS', description: 'Breadth-first search explores all neighbors first.' },
    { id: 'dfs', name: 'DFS', description: 'Depth-first search explores deep paths first.' },
  ];

  const handleVisualize = () => {
    setIsVisualizing(true);
    setTimeout(() => setIsVisualizing(false), 1500);
  };

  const handleClearGrid = () => alert('Grid cleared');
  const handleClearPath = () => alert('Path cleared');
  const handleGenerateMaze = () => alert('Maze generated');

  return (
    <div className="app-container">
      <h1>Pathfinding Visualizer</h1>

      <AlgorithmSelector
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={setSelectedAlgorithm}
        algorithms={algorithms}
      />

      <ControlsComponent
        isVisualizing={isVisualizing}
        onVisualize={handleVisualize}
        onClearGrid={handleClearGrid}
        onClearPath={handleClearPath}
        onGenerateMaze={handleGenerateMaze}
      />

      <GridComponent />

      <StatsPanel />
    </div>
  );
};

export default App;
