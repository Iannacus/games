import PropTypes from "prop-types";
import Button from "../components/Button";
import Page from "./Page";

function GameLayout({
  children,
  changeBoard,
  timer,
  boardNumber,
  pauseGame,
  isPaused,
  showNext,
  onResetBoard,
  boards,
}) {
  return (
    <Page>
      <div className="flex justify-center w-full px-4 py-2 bg-slate-900">
        Menu Bar
      </div>
      <h2 className="text-white">{timer}</h2>
      <div
        className={`max-w-[500px] min-w-[350px] px-[10px] ${
          showNext ? "invisible" : "visible"
        } flex gap-4`}
      >
        <Button label="Borrar tablero" onClick={onResetBoard} />
        <Button
          label={isPaused ? "Reanudar juego" : "Pausar juego"}
          onClick={pauseGame}
        />
      </div>
      <div
        className={`max-w-[500px] min-w-[350px] border-2  border-slate-900 rounded-[20px] overflow-hidden ${
          isPaused ? "invisible" : "visible"
        }`}
      >
        {children}
      </div>
      {showNext && (
        <div
          className={`max-w-[500px] min-w-[350px] px-[10px] flex gap-4 ${
            boardNumber < boards ? "justify-end" : "justify-start"
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
          {boardNumber < boards && (
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
    </Page>
  );
}

export default GameLayout;

GameLayout.propTypes = {
  children: PropTypes.node,
  changeBoard: PropTypes.func,
  timer: PropTypes.string,
  boardNumber: PropTypes.number,
  pauseGame: PropTypes.func,
  isPaused: PropTypes.bool,
  showNext: PropTypes.bool,
  onResetBoard: PropTypes.func,
  boards: PropTypes.number,
};
