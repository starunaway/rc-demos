import React, {Component} from 'react';
import './style.less';

class Box extends Component {
  state = {
    selectedCell: [],
  };

  handleCellClick = (key) => () => {
    let {selectedCell} = this.state;
    if (selectedCell.includes(key)) {
      selectedCell = selectedCell.filter((c) => c !== key);
    } else {
      selectedCell.push(key);
    }
    this.setState({selectedCell: [...selectedCell]});
  };

  renderCell = (columnIndex) => {
    const {selectedCell} = this.state;
    return new Array(30).fill(' ').map((a, cellIndex) => {
      let cellKey = `${columnIndex}-${cellIndex}`;
      return (
        <div
          className={`box-column-cell ${selectedCell.includes(cellKey) ? 'cell-selected' : ''}`}
          key={cellKey}
          onClick={this.handleCellClick(cellKey)}
        ></div>
      );
    });
  };

  renderColumn = () => {
    return new Array(30).fill(' ').map((a, columnIndex) => {
      return (
        <div className='box-column' key={columnIndex}>
          {this.renderCell(columnIndex)}
        </div>
      );
    });
  };

  render() {
    return <div className='css-box'>{this.renderColumn()}</div>;
  }
}
export default Box;
