import React from 'react';
import { NODE_TYPES } from '../constants';

const GridComponent = ({ grid, onCellClick, onCellDrag, isVisualizing, visitedNodes, pathNodes }) => {

  // Determine if cell is visited or on the path
  const isVisited = (row, col) => 
    visitedNodes.some(n => n[0] === row && n[1] === col);

  const isPath = (row, col) => 
    pathNodes.some(n => n[0] === row && n[1] === col);

  return (
    <div className="grid-container">
      <div className="grid">
        {grid.map((rowArr, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {rowArr.map((cellType, colIdx) => {
              let className = `cell ${cellType}`;
              if (isVisited(rowIdx, colIdx)) className += ' visited';
              if (isPath(rowIdx, colIdx)) className += ' path';

              return (
                <div
                  key={colIdx}
                  className={className}
                  onClick={() => onCellClick(rowIdx, colIdx)}
                  onMouseEnter={(e) => e.buttons === 1 && onCellDrag(rowIdx, colIdx)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
