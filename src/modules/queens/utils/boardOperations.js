import {cleanCells} from './boardCleaners';
import { validateNewQueen, countQueens, xValidation } from "./boardValidations";

export const transformBoard = (board) => {
  return board.map((row, i) => transformRow(row, i));
};

const transformRow = (row, i) => {
  return row.map((cell, j) => ({
    color: cell.color,
    col: j,
    row: i,
    state: cell.blocked ? "queen" : "empty",
    isWrong: false,
    invalid: false,
    blocked: cell.blocked,
    method: "",
  }));
};

export const boardCopy = (board) => {
  return board.map((row) => row.map((cell) => ({ ...cell })));
};

export const markCellWithX = (updateBoard, board, col, row) => {
  board[row][col].state = "x";
  board[row][col].method = "man";
  updateBoard(board);
};

export const markCellWithQueen = (updateBoard, board, col, row) => {
  board[row][col].state = "queen";
  board[row][col].stack = countQueens(board);
  const color = board[row][col].color;
  validateNewQueen(board, col, row);
  xValidation(board, row, col, color);
  updateBoard(board);
};

export const unmarkCell = (updateBoard, board, col, row) => {
  board[row][col].state = "empty";
  cleanCells(board, row, col);
  updateBoard(board);
};