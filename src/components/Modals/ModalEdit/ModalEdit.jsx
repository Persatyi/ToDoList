import s from "./ModalEdit.module.css";
import ModalWrapper from "components/ModalWrapper";

const ModalEdit = ({ open, onClose, data }) => {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className={s.editWindow}></div>
    </ModalWrapper>
  );
};

export default ModalEdit;
