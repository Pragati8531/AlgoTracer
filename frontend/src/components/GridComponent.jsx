import React, { useState, useEffect } from 'react';
import './Grid.css';

const GridComponent = () => {
  // Create grid state (default 20x40 grid)
  const [grid, setGrid] = useState([]);

  // Initialize grid once when the component mounts
  useEffect(() => {
    const rows = 20;
    const cols = 40;
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isStart: false,
        isEnd: false,
        isWall: false,
        isVisited: false,
      }))
    );
    setGrid(newGrid);
  }, []);

  // Handle clicks on cells (you can modify logic later)
  const handleCellClick = (row, col) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, isWall: !cell.isWall };
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div className="grid-container">
      {grid && grid.length > 0 ? (
        grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${cell.isWall ? 'wall' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading grid...</p>
      )}
    </div>
  );
};

export default GridComponent;
