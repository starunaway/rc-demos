import React, {Component, useState} from 'react';
import './style.less';

export default () => {
  const [selectedCell, setSelectedCell] = useState([]);

  const handleCellClick = (key) => () => {
    if (selectedCell.includes(key)) {
      setSelectedCell((x) => x.filter((c) => c !== key));
    } else {
      setSelectedCell((x) => [...x, key]);
    }
  };

  const renderCell = (columnIndex) => {
    return new Array(30).fill(' ').map((a, cellIndex) => {
      let cellKey = `${columnIndex}-${cellIndex}`;
      return (
        <div
          className={`box-column-cell ${selectedCell.includes(cellKey) ? 'cell-selected' : ''}`}
          key={cellKey}
          onClick={handleCellClick(cellKey)}
        ></div>
      );
    });
  };

  const renderColumn = () => {
    return new Array(30).fill(' ').map((a, columnIndex) => {
      return (
        <div className='box-column' key={columnIndex}>
          {renderCell(columnIndex)}
        </div>
      );
    });
  };

  return <div className='css-box'>{renderColumn()}</div>;
};
