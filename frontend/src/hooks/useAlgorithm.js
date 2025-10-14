import { useState } from 'react';
import { runBFS, runDFS, runAStar } from '../api';

export const useAlgorithm = () => {
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const visualizeAlgorithm = async (algorithm, grid, start, end) => {
    setIsVisualizing(true);
    setError(null);
    
    try {
      let result;
      
      switch (algorithm) {
        case 'bfs':
          result = await runBFS(grid, start, end);
          break;
        case 'dfs':
          result = await runDFS(grid, start, end);
          break;
        case 'astar':
          result = await runAStar(grid, start, end);
          break;
        default:
          throw new Error(`Unknown algorithm: ${algorithm}`);
      }
      
      setStats(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Algorithm error:', err);
    } finally {
      setIsVisualizing(false);
    }
  };

  const clearStats = () => {
    setStats(null);
    setError(null);
  };

  return {
    isVisualizing,
    stats,
    error,
    visualizeAlgorithm,
    clearStats,
  };
};
