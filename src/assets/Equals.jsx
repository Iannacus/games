import PropTypes from "prop-types";

export default function Equals({ color, width = "100%" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={width}
      className={color}
    >
      <path d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l352 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48 128zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32l352 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48 320z" />
    </svg>
  );
}

Equals.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
};
