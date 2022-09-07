import PropTypes from "prop-types";
import s from "./Overlay.module.css";

const Overlay = ({ children, onClick }) => {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) onClick();
  };
  return (
    <div onClick={handleClick} className={s.overlay}>
      {children}
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Overlay;
