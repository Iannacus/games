import PropTypes from "prop-types";

export default function Page({ children }) {
  return (
    <div className="bg-slate-950 h-screen flex flex-col justify-start items-center gap-12">
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node,
};
