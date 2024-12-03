import debounce from "../../../utils/debounce";
import { cleanBoard } from "./cleaners";
import { boardValidations } from "./validations";

export const countRowItems = (row, item) => {
  return row.reduce((acc, cell) => {
    if (cell.state === item) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

export const countColItems = (board, col, item) => {
  return board.reduce((acc, row) => {
    if (row[col].state === item) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

export const rowSum = (cells) => {
  return cells.reduce((acc, cell) => {
    const val = cell.col + 1;
    return acc + val;
  }, 0);
};

export const markCellWith = (mark, board, cell) => {
  cell.state = mark;
  cleanBoard(board);
  const validating = debounce(boardValidations, 300);
  validating(board);
};
