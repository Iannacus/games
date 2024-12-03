import PropTypes from "prop-types";

import Mark from "../assets/Mark";
import Queen from "../assets/Queen";
import Diagonals from "../assets/Diagonals";
import { colorsDic } from "../modules/queens/utils/colorClasses";

export default function Cell({
  cell,
  size,
  onClick = () => {},
  onMove = () => {},
  onDown = () => {},
  border = {},
}) {
  const getBorder = (border) => {
    if (Object.keys(border).length > 0) {
      const { bottom, right } = border;
      if (!bottom) return "border-b border-r-2";
      if (!right) return "border-r border-b-2";
      return "border-b-2 border-r-2";
    }
    return "border-b border-r";
  };

  return (
    <div
      className={`relative ${size || "w-[11.11%]"} aspect-square ${getBorder(
        border
      )} border-slate-900 flex justify-center items-center ${
        colorsDic[cell.color]
      } ${cell.isWrong ? "text-red-500" : "text-slate-900"}`}
      onMouseDown={() => onDown(cell.state)}
      onClick={cell.blocked ? () => {} : () => onClick()}
      onMouseMove={onMove}
    >
      <div className={cell.state === "queen" ? "w-1/2" : "w-1/4"}>
        {cell.state === "queen" && (
          <Queen color={cell.isWrong ? "fill-red-600" : "fill-zinc-950"} />
        )}
        {cell.state === "x" && (
          <Mark color={cell.isWrong ? "fill-red-600" : "fill-zinc-950"} />
        )}
      </div>
      {cell.invalid && (
        <div className="absolute top-0 left-0 ">
          <Diagonals width="100%" color="stroke-red-600" />
        </div>
      )}
    </div>
  );
}

Cell.propTypes = {
  cell: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number,
    color: PropTypes.string,
    state: PropTypes.oneOf(["empty", "x", "queen"]),
    isWrong: PropTypes.bool,
    invalid: PropTypes.bool,
    blocked: PropTypes.bool,
    method: PropTypes.string,
  }),
  size: PropTypes.string,
  onClick: PropTypes.func,
  onMove: PropTypes.func,
  onDown: PropTypes.func,
  border: PropTypes.shape({
    bottom: PropTypes.bool,
    right: PropTypes.bool,
  }),
};
