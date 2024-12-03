import PropTypes from "prop-types";
import Moon from "../../../assets/Moon";
import Sun from "../../../assets/Sun";
import Diagonals from "../../../assets/Diagonals";
import Equals from "../../../assets/Equals";
import Times from "../../../assets/Times";

const dic = {
  r: "right-[-10%]",
  l: "left-[-10%]",
  b: "bottom-[-10%]",
  t: "top-[-10%]",
};

export default function Cell({ cell, onMark }) {
  return (
    <div
      onClick={cell.blocked || cell.initialBlocked ? () => {} : onMark}
      className={`${
        cell.initialBlocked ? "bg-slate-200" : "bg-slate-100"
      } relative w-[16.66%] border-b-[1px] border-l-[1px] aspect-square flex justify-center items-center`}
    >
      {cell.equals && (
        <>
          {cell.equals.split("").map((pos, i) => (
            <div
              key={i}
              className={`absolute z-4 w-[20%] ${dic[pos]} bg-slate-100`}
            >
              <Equals color="fill-slate-700" />
            </div>
          ))}
        </>
      )}
      {cell.times && (
        <>
          {cell.times.split("").map((pos, i) => (
            <div
              key={i}
              className={`absolute z-4 w-[20%] ${dic[pos]} bg-slate-100`}
            >
              <Times color="fill-slate-700" />
            </div>
          ))}
        </>
      )}
      {cell.invalid && (
        <div className="absolute z-1 top-0 left-0  opacity-90">
          <Diagonals width="100%" color="stroke-red-600" />
        </div>
      )}
      <div
        className={`${
          cell.state === "sun" ? "w-[50%]" : "w-[40%]"
        }  absolute z-2 m-auto`}
      >
        {cell.state === "sun" && <Sun color="fill-amber-500" />}
        {cell.state === "moon" && <Moon color="fill-sky-700" />}
      </div>
    </div>
  );
}

Cell.propTypes = {
  cell: PropTypes.shape({
    state: PropTypes.string,
    blocked: PropTypes.bool,
    initialBlocked: PropTypes.bool,
    invalid: PropTypes.bool,
    equals: PropTypes.string,
    times: PropTypes.string,
  }),
  onMark: PropTypes.func,
};
