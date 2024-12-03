const cleanCell = (cell) => {
  cell.invalid = false;
};

const cleanRow = (row) => {
  row.forEach((cell) => cleanCell(cell));
};

export const cleanBoard = (board) => {
  board.forEach((row) => cleanRow(row));
};
