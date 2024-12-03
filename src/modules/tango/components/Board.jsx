import Cell from "./Cell";
import PropTypes from "prop-types";

import useTangoBoard from "../hooks/useTangoBoard";
import { useEffect } from "react";

export default function Board({ board, resetBoard, handleReset, onComplete }) {
  const {
    board: gameBoard,
    markCell,
    changeBoard,
    isGameComplete,
  } = useTangoBoard(board);

  useEffect(() => {
    if (resetBoard) {
      changeBoard(board);
      handleReset();
    }
  }, [resetBoard]);

  useEffect(() => {
    if (isGameComplete()) {
      onComplete();
    }
  }, [gameBoard]);

  return (
    <div className="max-w-[500px] min-w-[350px] border-2  border-slate-900 rounded-[20px] overflow-hidden">
      {gameBoard.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <Cell key={j} cell={cell} onMark={() => markCell(i, j)} />
          ))}
        </div>
      ))}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array,
  resetBoard: PropTypes.bool,
  handleReset: PropTypes.func,
  onComplete: PropTypes.func,
};