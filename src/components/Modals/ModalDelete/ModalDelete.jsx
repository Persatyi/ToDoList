import { toast } from "react-toastify";

import s from "./ModalDelete.module.css";
import ModalWrapper from "components/ModalWrapper";
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
          <button type="button" className={s.button} onClick={removeTask}>
            remove
          </button>
          <button type="button" className={s.button} onClick={onClose}>
            cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalDelete;
