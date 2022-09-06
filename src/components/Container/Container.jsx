import s from "./Container.module.css";

const Container = (props) => {
  const { children, className } = props;
  return <div className={`${s.container} ${className}`}>{children}</div>;
};

export default Container;
