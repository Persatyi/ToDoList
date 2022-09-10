import { toast } from "react-toastify";
import PropTypes from "prop-types";

import s from "./ModalDelete.module.css";
import ModalWrapper from "components/ModalWrapper";
import Button from "components/Button";
import { get, save, taskKey } from "localStorage/localStorage";

const ModalDelete = ({ open, onClose, id, setState }) => {
  const removeTask = async () => {
    const dataBase = await get(taskKey);
    const newData = dataBase.filter((el) => el.id !== id);

    await save(taskKey, newData);
    setState(newData);
    onClose();
    toast.success("Task has removed successfully!");
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className={s.modalWindow}>
        <h3 className={s.title}>Please confirm removal</h3>
        <div className={s.btnWrapper}>
          <Button
            type="button"
            className={s.button}
            onClick={removeTask}
            text="remove"
          />
          <Button
            type="button"
            className={s.button}
            onClick={onClose}
            text="cancel"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

ModalDelete.propTypes = {
  setState: PropTypes.func,
  id: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default ModalDelete;
