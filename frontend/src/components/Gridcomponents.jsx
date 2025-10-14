import React from 'react';
import '../styles/Grid.css';

const GridComponent = ({ 
  grid, 
  onCellClick, 
  onCellDrag,
  isVisualizing,
  visitedNodes,
  pathNodes 
}) => {
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    onCellClick(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      onCellDrag(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const getCellClass = (row, col) => {
    const cellType = grid[row][col];
    let className = `cell ${cellType}`;
    
    if (pathNodes && pathNodes.some(node => node[0] === row && node[1] === col)) {
      className += ' path';
    } else if (visitedNodes && visitedNodes.some(node => node[0] === row && node[1] === col)) {
      className += ' visited';
    }
    
    if (isVisualizing) {
      className += ' visualizing';
    }
    
    return className;
  };

  return (
    <div 
      className="grid-container"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellClass(rowIndex, colIndex)}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                title={`(${rowIndex}, ${colIndex})`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
