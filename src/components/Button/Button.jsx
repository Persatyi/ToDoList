import s from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({
  type = "button",
  styleType = "main",
  text,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : null}
      className={`${s[styleType]} ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  styleType: PropTypes.oneOf(["main"]),
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
