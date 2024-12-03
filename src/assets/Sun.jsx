import PropTypes from "prop-types";

export default function Sun({ color, extras }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={`${color} ${extras}`}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
}

Sun.propTypes = {
  color: PropTypes.string,
  extras: PropTypes.string,
};
