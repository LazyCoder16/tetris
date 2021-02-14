import Box from './Box';
import colors from './colors.json';

function Board(props) {
  const { board, rows, cols } = props;
  const renderBox = (i, j) => <Box key={`${i} ${j}`} color={colors[board[i][j]]}/>;

  const renderRow = (i) => {
    let row = [];
    for(let j=0; j<cols; ++j) {
      row.push(renderBox(i, j));
    }
    return <div key={i} className="row">{ row }</div>;
  }

  let boardJSX = [];
  for(let i=0; i<rows; ++i) {
    boardJSX.push(renderRow(i));
  }
  return <div id="board">{ boardJSX }</div>;
}

export default Board;