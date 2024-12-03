const transformRow = (row, i) => {
  return row.map((cell, j) => ({
    state: !cell.state ? "empty" : cell.state,
    blocked: false,
    initialBlocked: cell.state !== "",
    invalid: false,
    row: i,
    col: j,
    equals: cell.equals || "",
    times: cell.times || "",
  }));
};

export const transformBoard = (board) => {
  return board.map((row, i) => transformRow(row, i));
};
