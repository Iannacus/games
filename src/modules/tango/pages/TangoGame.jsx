import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useReset from "../../../hooks/useReset";
import useTimer from "../../../hooks/useTimer";
import TangoBoard from "../components/Board";
import GameLayout from "../../../layouts/GameLayout";

import { boards } from "../boards";

export default function TangoGame() {
  const {
    timer,
    startInterval,
    stopInterval,
    resetInterval,
    pauseGame,
    isPaused,
  } = useTimer();

  const { resetBoard, onResetBoard, cancelReset } = useReset();

  const [showNext, setShowNext] = useState(false);

  const { boardNumber } = useParams();

  const navigate = useNavigate();

  const changeBoard = (board) => {
    setShowNext(false);
    navigate(`/tango/board/${board}`);
    resetInterval();
    onResetBoard();
    startInterval();
  };

  return (
    <GameLayout
      changeBoard={changeBoard}
      timer={timer}
      boardNumber={boardNumber}
      pauseGame={pauseGame}
      isPaused={isPaused}
      showNext={showNext}
      onResetBoard={onResetBoard}
      boards={boards.length}
    >
      <TangoBoard
        board={boards[boardNumber - 1]}
        onComplete={() => {
          stopInterval();
          setShowNext(true);
        }}
        resetBoard={resetBoard}
        handleReset={cancelReset}
      />
    </GameLayout>
  );
}
