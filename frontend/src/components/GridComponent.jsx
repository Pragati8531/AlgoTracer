import React, { useEffect, useState } from 'react';

const GridComponent = ({ isVisualizing }) => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // Create a simple 10x10 grid for demo
    const tempGrid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => 0)
    );
    setGrid(tempGrid);
  }, []);

  useEffect(() => {
    if (isVisualizing) {
      console.log("Visualization started!");
      // For demo: color random cells
      const interval = setInterval(() => {
        setGrid((prev) =>
          prev.map((row) =>
            row.map(() => (Math.random() > 0.7 ? 1 : 0))
          )
        );
      }, 100);
      setTimeout(() => clearInterval(interval), 1500);
    }
  }, [isVisualizing]);

  return (
    <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 20px)', gap: '2px' }}>
      {grid.map((row, rIdx) =>
        row.map((cell, cIdx) => (
          <div
            key={`${rIdx}-${cIdx}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: cell ? 'lightblue' : 'lightgray',
              border: '1px solid #ccc',
            }}
          />
        ))
      )}
    </div>
  );
};

export default GridComponent;
