
import React, { useState, useEffect } from "react";
import "./grid.css";

const GridComponent = ({ algorithm }) => {
  const numRows = 15;
  const numCols = 30;
  const [grid, setGrid] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);

  // Initialize grid
  useEffect(() => {
    const newGrid = Array.from({ length: numRows }, (_, row) =>
      Array.from({ length: numCols }, (_, col) => ({
        row,
        col,
        type: "empty",
      }))
    );
    // Set start and end points
    newGrid[7][5].type = "start";
    newGrid[7][25].type = "end";
    setGrid(newGrid);
  }, []);

  // Visualize Algorithm
  const visualize = async () => {
    if (isVisualizing) return;
    setIsVisualizing(true);

    const start = [7, 5];
    const end = [7, 25];

    const response = await fetch(`http://127.0.0.1:5000/api/run-${algorithm.toLowerCase()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grid, start, end }),
    });

    const result = await response.json();

    if (result.error) {
      alert("Error: " + result.error);
      setIsVisualizing(false);
      return;
    }

    const visitedNodes = result.visited || result.visitedNodes || [];
    const pathNodes = result.path || result.pathNodes || [];

    // Animate visited cells
    for (let i = 0; i < visitedNodes.length; i++) {
      const { row, col } = visitedNodes[i];
      setTimeout(() => {
        updateGrid(row, col, "visited");
      }, 20 * i);
    }

    // Animate path after visiting
    setTimeout(() => {
      for (let i = 0; i < pathNodes.length; i++) {
        const { row, col } = pathNodes[i];
        setTimeout(() => {
          updateGrid(row, col, "path");
        }, 40 * i);
      }
      setIsVisualizing(false);
    }, 20 * visitedNodes.length);
  };

  const updateGrid = (row, col, newType) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => r.map((cell) => ({ ...cell })));
      if (
        newGrid[row][col].type !== "start" &&
        newGrid[row][col].type !== "end"
      ) {
        newGrid[row][col].type = newType;
      }
      return newGrid;
    });
  };

  return (
    <div className="visualizer-container">
      <div className="controls">
        <button
          onClick={visualize}
          disabled={isVisualizing}
          className="visualize-btn"
        >
          {isVisualizing ? "Running..." : "Visualize"}
        </button>
      </div>

      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className={`cell ${cell.type}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
