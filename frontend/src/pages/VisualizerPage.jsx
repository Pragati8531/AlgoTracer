/*import React, { useState, useEffect } from "react";
import "../styles/VisualizerPage.css";

const numRows = 20;
const numCols = 40;

const VisualizerPage = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: 10, col: 5 });
  const [endNode, setEndNode] = useState({ row: 10, col: 35 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [algorithm, setAlgorithm] = useState("bfs");

  useEffect(() => {
    createGrid();
  }, []);

  const createGrid = () => {
    const newGrid = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === startNode.row && col === startNode.col,
          isEnd: row === endNode.row && col === endNode.col,
          isWall: false,
          isVisited: false,
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
  };

  const toggleWall = (row, col) => {
    if (isAnimating) return;
    const newGrid = grid.map((r) =>
      r.map((node) =>
        node.row === row && node.col === col
          ? { ...node, isWall: !node.isWall }
          : node
      )
    );
    setGrid(newGrid);
  };

  const visualizePath = async () => {
    setIsAnimating(true);
    const visitedNodes = runAlgorithm(algorithm);
    await animateVisitedNodes(visitedNodes);
    setIsAnimating(false);
  };

  const runAlgorithm = (algo) => {
    switch (algo) {
      case "bfs":
        return bfs(grid, startNode, endNode);
      case "dfs":
        return dfs(grid, startNode, endNode);
      case "dijkstra":
        return dijkstra(grid, startNode, endNode);
      case "astar":
        return astar(grid, startNode, endNode);
      default:
        return [];
    }
  };

  const animateVisitedNodes = (visitedNodes) => {
    return new Promise((resolve) => {
      visitedNodes.forEach((node, i) => {
        setTimeout(() => {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((r) =>
              r.map((n) =>
                n.row === node.row && n.col === node.col
                  ? { ...n, isVisited: true }
                  : n
              )
            );
            return newGrid;
          });
          if (i === visitedNodes.length - 1) resolve();
        }, 30 * i);
      });
    });
  };

  // Simple BFS Example
  const bfs = (grid, start, end) => {
    const queue = [start];
    const visited = [];
    const visitedSet = new Set();

    while (queue.length) {
      const current = queue.shift();
      const key = `${current.row}-${current.col}`;
      if (visitedSet.has(key)) continue;
      visitedSet.add(key);
      visited.push(current);
      if (current.row === end.row && current.col === end.col) break;

      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dr, dc] of directions) {
        const newRow = current.row + dr;
        const newCol = current.col + dc;
        if (
          newRow >= 0 &&
          newRow < numRows &&
          newCol >= 0 &&
          newCol < numCols &&
          !grid[newRow][newCol].isWall
        ) {
          queue.push({ row: newRow, col: newCol });
        }
      }
    }

    return visited;
  };

  // Dummy DFS/Dijkstra/A* (for now, uses BFS)
  const dfs = bfs;
  const dijkstra = bfs;
  const astar = bfs;

  return (
    <div className="visualizer-container">
      <h1 className="title">✨ Algorithm Visualizer ✨</h1>
      <div className="controls">
        <select
          className="dropdown"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bfs">Breadth-First Search (BFS)</option>
          <option value="dfs">Depth-First Search (DFS)</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
        </select>
        <button className="visualize-btn" onClick={visualizePath}>
          🚀 Visualize Path
        </button>
        <button className="reset-btn" onClick={createGrid}>
          🔄 Reset Grid
        </button>
      </div>

      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => (
              <div
                key={nodeIdx}
                onClick={() => toggleWall(node.row, node.col)}
                className={`node 
                  ${node.isStart ? "start-node" : ""} 
                  ${node.isEnd ? "end-node" : ""} 
                  ${node.isWall ? "wall-node" : ""} 
                  ${node.isVisited ? "visited-node" : ""}
                `}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizerPage;
*/
import React, { useState, useEffect } from "react";
import "../styles/VisualizerPage.css";
import { runBFS, runDFS, runAStar, runDijkstra, runGBFS } from "../api";

const numRows = 20;
const numCols = 40;

const VisualizerPage = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: 10, col: 5 });
  const [endNode, setEndNode] = useState({ row: 10, col: 35 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [result, setResult] = useState(null);
  const [dragType, setDragType] = useState(null);
  const [speed, setSpeed] = useState(20);

  useEffect(() => {
    createGrid();
  }, [startNode, endNode]); // 🔥 re-render start/end correctly

  const createGrid = () => {
    const newGrid = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === startNode.row && col === startNode.col,
          isEnd: row === endNode.row && col === endNode.col,
          isWall: false,
          isVisited: false,
          isPath: false,
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setResult(null);
  };

  // ---------------------------
  // WALL + DRAG LOGIC FIXED 
  // ---------------------------

  const toggleWall = (row, col) => {
    if (isAnimating) return;

    // ❗ Prevent making start/end a wall
    if ((row === startNode.row && col === startNode.col) ||
        (row === endNode.row && col === endNode.col)) return;

    setGrid((prev) =>
      prev.map((r) =>
        r.map((node) =>
          node.row === row && node.col === col
            ? { ...node, isWall: !node.isWall }
            : node
        )
      )
    );
  };

  const handleMouseDown = (row, col) => {
    const node = grid[row][col];

    if (node.isStart) {
      setDragType("start");
    } else if (node.isEnd) {
      setDragType("end");
    } else {
      setDragType("wall");
      toggleWall(row, col);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!dragType || isAnimating) return;

    if (dragType === "start") {
      if (!grid[row][col].isWall) {
        setStartNode({ row, col });
      }
    }

    if (dragType === "end") {
      if (!grid[row][col].isWall) {
        setEndNode({ row, col });
      }
    }

    if (dragType === "wall") {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setDragType(null);
  };

  // ---------------------------
  // PATHFINDING & ANIMATION 
  // ---------------------------
  const visualizePath = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setResult(null);

    const gridData = grid.map((row) => row.map((node) => (node.isWall ? 1 : 0)));
    const start = [startNode.row, startNode.col];
    const end = [endNode.row, endNode.col];

    let resultData;

    try {
      if (algorithm === "bfs") resultData = await runBFS(gridData, start, end);
      if (algorithm === "dfs") resultData = await runDFS(gridData, start, end);
      if (algorithm === "astar") resultData = await runAStar(gridData, start, end);
      if (algorithm === "dijkstra") resultData = await runDijkstra(gridData, start, end);
      if (algorithm === "gbfs") resultData = await runGBFS(gridData, start, end);

      const visitedNodes = resultData.visitedNodes || [];
      const path = resultData.path || [];

      await animateVisited(visitedNodes);
      await animatePath(path);

      setResult(resultData);
    } catch (err) {
      console.error(err);
    }

    setIsAnimating(false);
  };

  const animateVisited = (nodes) => {
    return new Promise((resolve) => {
      nodes.forEach((node, i) => {
        setTimeout(() => {
          setGrid((prev) =>
            prev.map((r) =>
              r.map((n) =>
                n.row === node[0] && n.col === node[1]
                  ? { ...n, isVisited: true }
                  : n
              )
            )
          );
          if (i === nodes.length - 1) resolve();
        }, speed * i);
      });
    });
  };

  const animatePath = (path) => {
    return new Promise((resolve) => {
      path.forEach((node, i) => {
        setTimeout(() => {
          setGrid((prev) =>
            prev.map((r) =>
              r.map((n) =>
                n.row === node[0] && n.col === node[1]
                  ? { ...n, isPath: true }
                  : n
              )
            )
          );
          if (i === path.length - 1) resolve();
        }, speed * i);
      });
    });
  };

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="visualizer-container">
      <h1 className="title">✨ Algorithm Visualizer ✨</h1>

      <div className="controls">
        <select
          className="dropdown"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bfs">Breadth-First Search (BFS)</option>
          <option value="dfs">Depth-First Search (DFS)</option>
          <option value="astar">A* Search</option>
          <option value="dijkstra">Dijkstra’s Algorithm</option>
          <option value="gbfs">Greedy Best-First Search</option>
        </select>

        <button className="visualize-btn" onClick={visualizePath}>
          🚀 Visualize Path
        </button>

        <button className="reset-btn" onClick={createGrid}>
          🔄 Reset Grid
        </button>
      </div>

      <div className="speed-control">
        <label>Animation Speed:</label>
        <input
          type="range"
          min="5"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      {result && (
        <div className="info-box">
          <p><b>Algorithm:</b> {algorithm.toUpperCase()}</p>
          <p><b>Nodes Visited:</b> {result.visitedNodes?.length || 0}</p>
          <p><b>Path Length:</b> {result.path?.length || 0}</p>
          <p><b>Execution Time:</b> {result.time?.toFixed(2)} ms</p>
        </div>
      )}

      <div className="grid">
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="grid-row">
            {row.map((node, cIdx) => (
              <div
                key={cIdx}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={handleMouseUp}
                className={`node 
                  ${node.isStart ? "start-node" : ""} 
                  ${node.isEnd ? "end-node" : ""} 
                  ${node.isWall ? "wall-node" : ""} 
                  ${node.isVisited ? "visited-node" : ""} 
                  ${node.isPath ? "path-node" : ""}
                `}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizerPage;
