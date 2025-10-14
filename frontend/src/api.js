const API_BASE = 'http://localhost:5000/api';

// Algorithm API calls
export const runBFS = async (grid, start, end) => {
  const response = await fetch(`${API_BASE}/run-bfs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grid, start, end }),
  });
  
  if (!response.ok) {
    throw new Error('BFS algorithm failed');
  }
  
  return await response.json();
};

export const runDFS = async (grid, start, end) => {
  const response = await fetch(`${API_BASE}/run-dfs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grid, start, end }),
  });
  
  if (!response.ok) {
    throw new Error('DFS algorithm failed');
  }
  
  return await response.json();
};

export const runAStar = async (grid, start, end) => {
  const response = await fetch(`${API_BASE}/run-astar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grid, start, end }),
  });
  
  if (!response.ok) {
    throw new Error('A* algorithm failed');
  }
  
  return await response.json();
};

// Get available algorithms
export const getAlgorithms = async () => {
  const response = await fetch(`${API_BASE}/algorithms`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch algorithms');
  }
  
  return await response.json();
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE}/health`);
  return await response.json();
};
