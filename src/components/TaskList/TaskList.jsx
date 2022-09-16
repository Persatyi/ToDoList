import { AiOutlineFileDone, AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import s from "./TaskList.module.css";
import Container from "components/Container";
import { ModalEdit, ModalDelete } from "components/Modals";
import { save, taskKey } from "localStorage/localStorage";
import { useToggle } from "hooks/useToggle";

const TaskList = ({ data, setState, type }) => {
  const [isEditOpen, openEditModal, closeEditModal] = useToggle();
  const [isDeleteOpen, openDeleteModal, closeDeleteModal] = useToggle();
  const [filteredData, setFilteredData] = useState([]);
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (type === "toDo") {
      const filetedData = data.filter((el) => el.isDone === false);
      setFilteredData(filetedData);
    } else if (type === "done") {
      const filetedData = data.filter((el) => el.isDone === true);
      setFilteredData(filetedData);
    } else if (type === "all") {
      setFilteredData(data);
    }
  }, [data, type]);

  const onCheckboxClick = async (id) => {
    const index = data.findIndex((el) => el.id === id);
    const obj = data[index];
    obj.isDone = true;
    const copyOfData = [...data];
    copyOfData.splice(index, 1, obj);

    await save(taskKey, copyOfData);
    setState(copyOfData);
    toast.success("Task successfully completed");
  };

  const onEditClick = (id) => {
    const task = data.find((el) => el.id === id);
    setTask(task);
    openEditModal();
  };

  const onDeleteClick = (id) => {
    setTask(id);
    openDeleteModal();
  };

  return (
    <section className={s.mainContent}>
      <Container>
        <ul className={s.list}>
          {filteredData.map(
            ({ id, isDone, name, description, time, edited = false }) => (
              <li key={id} id={id} className={s.item}>
                <div className={s.iconsWrapper}>
                  {isDone ? (
                    <AiOutlineFileDone className={s.iconDone} />
                  ) : (
                    <input
                      type="checkbox"
                      name={name}
                      onClick={() => onCheckboxClick(id)}
                    />
                  )}
                  <AiFillEdit
                    onClick={() => onEditClick(id)}
                    id={id}
                    className={s.editIcon}
                  />
                  <AiTwotoneDelete
                    id={id}
                    className={s.deleteIcon}
                    onClick={() => onDeleteClick(id)}
                  />
                </div>

                <div className={s.contentWrapper}>
                  <h3 className={s.name}>{name}</h3>
                  <p className={s.description}>{description}</p>
                  <span className={s.time}>
                    {isDone || edited ? "Updated at: " : "Created at: "}
                    {new Date(time).toLocaleString("ua")}
                  </span>
                </div>
              </li>
            )
          )}
        </ul>
      </Container>
      {isEditOpen && (
        <ModalEdit
          open={isEditOpen}
          onClose={closeEditModal}
          data={task}
          setState={setState}
        />
      )}
      {isDeleteOpen && (
        <ModalDelete
          open={isDeleteOpen}
          onClose={closeDeleteModal}
          id={task}
          setState={setState}
        />
      )}
    </section>
  );
};

TaskList.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  setState: PropTypes.func,
};

export default TaskList;
