import { countColItems, countRowItems } from "./operations";

export const validateBoard = (board) => {
  if (board.length === 0) return false;

  const isInvalid = board.some((row) => row.some((cell) => cell.invalid));
  const isIncomplete = board.some((row) =>
    row.some((cell) => cell.state === "empty" || !cell.state)
  );

  return !isInvalid && !isIncomplete;
};

export const qytValidations = (board, row, col) => {
  const currentCell = board[row][col];

  if (currentCell.state === "empty") {
    return false;
  }

  const rowItems = countRowItems(board[row], currentCell.state);
  const colItems = countColItems(board, col, currentCell.state);

  if (rowItems > 3) {
    board[row].forEach((cell) => {
      cell.invalid = true;
    });
  }

  if (colItems > 3) {
    board.forEach((row) => {
      row[col].invalid = true;
    });
  }

  return true;
};

export const neiborhoodValidations = (board, row, col) => {
  const currentCell = board[row][col];

  if (currentCell.state === "empty") {
    return false;
  }

  const rowItems = countRowItems(board[row], currentCell.state);
  const colItems = countColItems(board, col, currentCell.state);

  if (rowItems >= 3) {
    for (let i = 1; i < board.length - 1; i++) {
      const evaluatingCell = board[row][i].state;
      if (
        evaluatingCell !== "empty" &&
        board[row][i - 1].state === evaluatingCell &&
        board[row][i + 1].state === evaluatingCell
      ) {
        board[row][i - 1].invalid = true;
        board[row][i + 1].invalid = true;
        board[row][i].invalid = true;
      }
    }
  }

  if (colItems === 3) {
    for (let i = 1; i < board.length - 1; i++) {
      const evaluatingCell = board[i][col].state;
      if (
        evaluatingCell !== "empty" &&
        board[i - 1][col].state === evaluatingCell &&
        board[i + 1][col].state === evaluatingCell
      ) {
        board[i - 1][col].invalid = true;
        board[i + 1][col].invalid = true;
        board[i][col].invalid = true;
      }
    }
  }

  return true;
};

export const equalsValidation = (board, row, col) => {
  const currentCell = board[row][col];

  if (!currentCell.equals) return false;
  if (currentCell.state === "empty") return false;

  const equals = currentCell.equals;

  if (equals.includes("t")) {
    if (board[row - 1][col].state === "empty") return;

    if (board[row - 1][col].state !== currentCell.state) {
      board[row - 1][col].invalid = true;
      currentCell.invalid = true;
    }
  }

  if (equals.includes("b")) {
    if (board[row + 1][col].state === "empty") return;

    if (board[row + 1][col].state !== currentCell.state) {
      board[row + 1][col].invalid = true;
      currentCell.invalid = true;
    }
  }

  if (equals.includes("r")) {
    if (board[row][col + 1].state === "empty") return;

    if (board[row][col + 1].state !== currentCell.state) {
      board[row][col + 1].invalid = true;
      currentCell.invalid = true;
    }
  }

  if (equals.includes("l")) {
    if (board[row][col - 1].state === "empty") return;

    if (board[row][col - 1].state !== currentCell.state) {
      board[row][col - 1].invalid = true;
      currentCell.invalid = true;
    }
  }

  return true;
};

export const timesValidation = (board, row, col) => {
  const currentCell = board[row][col];

  if (!currentCell.times) return false;
  if (currentCell.state === "empty") return false;

  const times = currentCell.times;

  if (times.includes("t")) {
    if (board[row - 1][col].state === "empty") return;

    if (board[row - 1][col].state === currentCell.state) {
      board[row - 1][col].invalid = true;
      currentCell.invalid = true;
    }
  }

  if (times.includes("b")) {
    if (board[row + 1][col].state === "empty") return;

    if (board[row + 1][col].state === currentCell.state) {
      board[row + 1][col].invalid = true;
      currentCell.invalid = true;
    }
  }

  if (times.includes("r")) {
    if (board[row][col + 1].state === "empty") return;

    if (board[row][col + 1].state === currentCell.state) {
      board[row][col + 1].invalid = true;
      currentCell.invalid = true;
    }
  }

  if (times.includes("l")) {
    if (board[row][col - 1].state === "empty") return;

    if (board[row][col - 1].state === currentCell.state) {
      board[row][col - 1].invalid = true;
      currentCell.invalid = true;
    }
  }

  return true;
};

export const boardValidations = (board) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      qytValidations(board, cell.row, cell.col);
      neiborhoodValidations(board, cell.row, cell.col);
      equalsValidation(board, cell.row, cell.col);
      timesValidation(board, cell.row, cell.col);
    });
  });
};