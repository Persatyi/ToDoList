import { AiOutlineFileDone, AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";

import s from "./TaskList.module.css";
import Container from "components/Container";
import ModalEdit from "components/Modals/ModalEdit";
import { save, taskKey } from "localStorage/localStorage";

const TaskList = ({ data, setState, section = "toDo" }) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [task, setTask] = useState(null);

  const onCheckboxClick = async (e) => {
    const id = e.target.value;
    const index = data.findIndex((el) => el.id === id);
    const obj = data[index];
    obj.isDone = true;
    const copyOfData = [...data];
    copyOfData.splice(index, 1, obj);

    await save(taskKey, copyOfData);
    setState(copyOfData);
  };

  const onEditClick = (e) => {
    const id = e.target.id;
    const task = data.find((el) => el.id === id);
    setTask(task);
    setModalEdit(true);
  };

  switch (section) {
    case "toDo":
      return (
        <section className={s.mainContent}>
          <Container>
            <ul className={s.list}>
              {data.map(
                ({ id, isDone, name, description, time }) =>
                  !isDone && (
                    <li key={id} id={id} className={s.item}>
                      <div className={s.iconsWrapper}>
                        <input
                          type="checkbox"
                          name={name}
                          value={id}
                          onClick={onCheckboxClick}
                        />
                        <AiFillEdit
                          onClick={onEditClick}
                          id={id}
                          className={s.editIcon}
                        />
                        <AiTwotoneDelete value={id} className={s.deleteIcon} />
                      </div>

                      <div className={s.contentWrapper}>
                        <h3 className={s.name}>{name}</h3>
                        <p className={s.description}>{description}</p>
                        <span className={s.time}>
                          {isDone ? "Updated at: " : "Created at: "}
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
        </section>
      );
    case "done":
      return (
        <section className={s.mainContent}>
          <Container>
            <ul className={s.list}>
              {data.map(
                ({ id, isDone, name, description, time }) =>
                  isDone && (
                    <li key={id} id={id} className={s.item}>
                      <div className={s.iconsWrapper}>
                        <AiOutlineFileDone className={s.iconDone} />
                        <AiFillEdit
                          onClick={onEditClick}
                          id={id}
                          className={s.editIcon}
                        />
                        <AiTwotoneDelete value={id} className={s.deleteIcon} />
                      </div>
                      <div className={s.contentWrapper}>
                        <h3 className={s.name}>{name}</h3>
                        <p className={s.description}>{description}</p>
                        <span className={s.time}>
                          {isDone ? "Updated at: " : "Created at: "}
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
        </section>
      );
    case "all":
      return (
        <section className={s.mainContent}>
          <Container>
            <ul className={s.list}>
              {data.map(({ id, isDone, name, description, time }) => (
                <li key={id} id={id} className={s.item}>
                  {isDone ? (
                    <div className={s.iconsWrapper}>
                      <AiOutlineFileDone className={s.iconDone} />
                      <AiFillEdit
                        onClick={onEditClick}
                        id={id}
                        className={s.editIcon}
                      />
                      <AiTwotoneDelete value={id} className={s.deleteIcon} />
                    </div>
                  ) : (
                    <div className={s.iconsWrapper}>
                      <input
                        type="checkbox"
                        name={name}
                        value={id}
                        onClick={onCheckboxClick}
                      />
                      <AiFillEdit
                        onClick={onEditClick}
                        id={id}
                        className={s.editIcon}
                      />
                      <AiTwotoneDelete value={id} className={s.deleteIcon} />
                    </div>
                  )}
                  <div className={s.contentWrapper}>
                    <h3 className={s.name}>{name}</h3>
                    <p className={s.description}>{description}</p>
                    <span className={s.time}>
                      {isDone ? "Updated at: " : "Created at: "}
                      {new Date(time).toLocaleString("ua")}
                    </span>
                  </div>
                </li>
              ))}
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
        </section>
      );

    default:
      break;
  }
};

export default TaskList;
