import { useEffect } from "react";
import PropTypes from "prop-types";
import Cell from "../../../components/Cell";

import useBoard from "../hooks/useBoard";

import { colorsDic } from "../utils/colorClasses";

export default function GameBoard({
  board,
  onComplete,
  resetBoard,
  handleReset,
}) {
  const {
    board: gameBoard,
    changeBoard,
    markCell,
    multipleMark,
    isPressed,
    handlePressed,
    handleMark,
    isGameComplete,
    getBorders,
    sizes,
  } = useBoard();

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
    <div
      onMouseDown={() => handlePressed(true)}
      onMouseUp={() => handlePressed(false)}
      onMouseLeave={() => handlePressed(false)}
      onDrag={() => {
        if (isPressed) handlePressed(false);
      }}
    >
      {gameBoard.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <Cell
              key={j}
              cell={cell}
              size={sizes[gameBoard.length]}
              border={getBorders(i, j)}
              onDown={handleMark}
              onClick={() =>
                markCell({
                  row: cell.row,
                  col: cell.col,
                  color: colorsDic[cell.color],
                })
              }
              onMove={() => {
                if (!isPressed || cell.blocked) return;
                multipleMark({
                  row: cell.row,
                  col: cell.col,
                });
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  board: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired,
  resetBoard: PropTypes.bool,
  handleReset: PropTypes.func.isRequired,
};
