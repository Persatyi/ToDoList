import s from "./Container.module.css";
import PropTypes from "prop-types";

const Container = (props) => {
  const { children, className } = props;
  return <div className={`${s.container} ${className}`}>{children}</div>;
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
