import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Level from "../components/Level";

import { boards } from "../boards";

export default function Levels({ game }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen gap-4 bg-slate-950">
      {boards.map((_, i) => {
        return (
          <Level
            key={i}
            level={i + 1}
            onClick={() => {
              navigate(`/${game}/board/${i + 1}`);
            }}
          />
        );
      })}
    </div>
  );
}

Levels.propTypes = {
  game: PropTypes.oneOf(["queens", "tango"]).isRequired,
};
