/*const API_BASE = 'http://localhost:5000/api';

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
*/


const API_BASE = "http://localhost:5000/api";

const postRequest = async (endpoint, body, errorMsg) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend Error:", data);
      throw new Error(data.error || errorMsg);
    }

    return data;
  } catch (err) {
    console.error("API Request Failed:", err);
    throw err;
  }
};

// Algorithm calls
export const runBFS = async (grid, start, end) =>
  await postRequest("/run-bfs", { grid, start, end }, "BFS algorithm failed");

export const runDFS = async (grid, start, end) =>
  await postRequest("/run-dfs", { grid, start, end }, "DFS algorithm failed");

export const runAStar = async (grid, start, end) =>
  await postRequest("/run-astar", { grid, start, end }, "A* algorithm failed");

export const runDijkstra = async (grid, start, end) =>
  await postRequest("/run-dijkstra", { grid, start, end }, "Dijkstra algorithm failed");

export const runGBFS = async (grid, start, end) =>
  await postRequest("/run-gbfs", { grid, start, end }, "GBFS algorithm failed");


// General API calls
export const getAlgorithms = async () => {
  const response = await fetch(`${API_BASE}/algorithms`);
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch algorithms");
  return data;
};

export const healthCheck = async () => {
  const response = await fetch(`${API_BASE}/health`);
  return await response.json();
};
