import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Page from "../../../layouts/Page";
import useReset from "../../queens/hooks/useReset";
import useTimer from "../../queens/hooks/useTimer";
import Board from "../components/Board";

import { boards } from "../boards";

export default function TangoGame() {
  const [showButtons, setShowButtons] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const {
    timer,
    startInterval,
    stopInterval,
    resetInterval,
    pauseGame,
    isPaused,
  } = useTimer();

  const { resetBoard, onResetBoard, cancelReset } = useReset();

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
    <Page>
      <div className="flex justify-center items-center w-full px-4 py-2 bg-slate-900">
        <h2 className="text-white">{timer}</h2>
        <div
          className={`${
            showButtons ? "visible" : "invisible"
          } max-w-[500px] min-w-[350px] px-[10px] flex gap-4`}
        >
          <Button label="Borrar tablero" onClick={onResetBoard} />
          <Button
            label={`${isPaused ? "Reanudar juego" : "Pausar juego"}`}
            onClick={pauseGame}
          />
        </div>
      </div>
      <div>
        <h1> Tango Game </h1>
        <Board
          board={boards[boardNumber - 1]}
          resetBoard={resetBoard}
          handleReset={cancelReset}
          onComplete={() => {
            stopInterval();
            setShowButtons(false);
            setShowNext(true);
          }}
        />
        {showNext && (
          <div
            className={`max-w-[500px] min-w-[350px] px-[10px] flex gap-4 ${
              boardNumber < boards.length ? "justify-end" : "justify-start"
            }`}
          >
            {boardNumber > 1 && (
              <div className="w-1/2">
                <Button
                  label="Anterior"
                  onClick={() => {
                    changeBoard(boardNumber - 1);
                  }}
                />
              </div>
            )}
            {boardNumber < boards.length && (
              <div className="w-1/2">
                <Button
                  label="Siguiente"
                  onClick={() => {
                    changeBoard(Number(boardNumber) + 1);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Page>
  );
}
