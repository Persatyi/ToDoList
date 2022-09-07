import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Overlay from "components/Overlay";
import s from "./ModalWrapper.module.css";

const ModalWrapper = ({ open, onClose, children }) => {
  const modalRef = useRef(document.getElementById("modal-root"));

  useEffect(() => {
    const onEscPress = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscPress);
    return () => window.removeEventListener("keydown", onEscPress);
  }, [onClose]);

  return (
    open &&
    createPortal(
      <Overlay onClick={onClose}>
        <div className={s.modal}>{children}</div>
      </Overlay>,
      modalRef.current
    )
  );
};

ModalWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalWrapper;
