import { AiOutlineFileDone, AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";

import s from "./TaskList.module.css";
import Container from "components/Container";
import { ModalEdit, ModalDelete } from "components/Modals";
import { save, taskKey } from "localStorage/localStorage";

const TaskList = ({ data, setState, section = "toDo" }) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [task, setTask] = useState(null);

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
    setModalEdit(true);
  };

  const onDeleteClick = (id) => {
    setTask(id);
    setModalDelete(true);
  };

  switch (section) {
    case "toDo":
      return (
        <section className={s.mainContent}>
          <Container>
            <ul className={s.list}>
              {data.map(
                ({ id, isDone, name, description, time, edited = false }) =>
                  !isDone && (
                    <li key={id} id={id} className={s.item}>
                      <div className={s.iconsWrapper}>
                        <input
                          type="checkbox"
                          name={name}
                          onClick={() => onCheckboxClick(id)}
                        />
                        <AiFillEdit
                          onClick={() => onEditClick(id)}
                          className={s.editIcon}
                        />
                        <AiTwotoneDelete
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
          {modalEdit && (
            <ModalEdit
              open={modalEdit}
              onClose={() => setModalEdit(false)}
              data={task}
              setState={setState}
            />
          )}
          {modalDelete && (
            <ModalDelete
              open={modalDelete}
              onClose={() => setModalDelete(false)}
              id={task}
              setState={setState}
            />
          )}
        </section>
      );
    case "done":
      return (
        <section className={s.mainContent}>
          <Container>
            <ul className={s.list}>
              {data.map(
                ({ id, isDone, name, description, time, edited = false }) =>
                  isDone && (
                    <li key={id} id={id} className={s.item}>
                      <div className={s.iconsWrapper}>
                        <AiOutlineFileDone className={s.iconDone} />
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
          {modalEdit && (
            <ModalEdit
              open={modalEdit}
              onClose={() => setModalEdit(false)}
              data={task}
              setState={setState}
            />
          )}
          {modalDelete && (
            <ModalDelete
              open={modalDelete}
              onClose={() => setModalDelete(false)}
              id={task}
              setState={setState}
            />
          )}
        </section>
      );
    case "all":
      return (
        <section className={s.mainContent}>
          <Container>
            <ul className={s.list}>
              {data.map(
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
          {modalEdit && (
            <ModalEdit
              open={modalEdit}
              onClose={() => setModalEdit(false)}
              data={task}
              setState={setState}
            />
          )}
          {modalDelete && (
            <ModalDelete
              open={modalDelete}
              onClose={() => setModalDelete(false)}
              id={task}
              setState={setState}
            />
          )}
        </section>
      );

    default:
      break;
  }
};

export default TaskList;
