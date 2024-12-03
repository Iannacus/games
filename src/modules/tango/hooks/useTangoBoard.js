import { useEffect, useState } from "react";

import { boardCopy } from "../../queens/utils/boardOperations";
import { transformBoard } from "../utils/tranforms";
import { validateBoard } from "../utils/validations";
import { markCellWith } from "../utils/operations";

export default function useTangoBoard(rawBoard) {
  const [board, setBoard] = useState(rawBoard);

  const changeBoard = (board) => {
    setBoard(transformBoard(board));
  };

  const markCell = (i, j) => {
    const copy = boardCopy(board);
    const currentCell = copy[i][j];

    if (currentCell.state === "empty") {
      markCellWith("sun", copy, currentCell);
      setBoard(copy);
      return;
    }

    if (currentCell.state === "sun") {
      markCellWith("moon", copy, currentCell);
      setBoard(copy);
      return;
    }

    markCellWith("empty", copy, currentCell);
    setBoard(copy);
  };

  const isGameComplete = () => {
    const isValid = validateBoard(board);
    if (isValid && board.some((row) => row.some((cell) => !cell.blocked))) {
      const copy = boardCopy(board);

      copy.forEach((row) => {
        row.forEach((cell) => {
          cell.blocked = true;
        });
      });

      setBoard(copy);
    }
    return isValid;
  };

  useEffect(() => {
    setBoard(transformBoard(rawBoard));
  }, [rawBoard]);

  return { board, markCell, changeBoard, isGameComplete };
}