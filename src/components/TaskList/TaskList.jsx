import { AiOutlineFileDone, AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

import s from "./TaskList.module.css";
import Container from "components/Container";
import { save, taskKey } from "localStorage/localStorage";

const TaskList = ({ data, setState, section = "toDo" }) => {
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
                        <AiFillEdit className={s.editIcon} />
                        <AiTwotoneDelete className={s.deleteIcon} />
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
                        <AiFillEdit className={s.editIcon} />
                        <AiTwotoneDelete className={s.deleteIcon} />
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
                      <AiFillEdit className={s.editIcon} />
                      <AiTwotoneDelete className={s.deleteIcon} />
                    </div>
                  ) : (
                    <div className={s.iconsWrapper}>
                      <input
                        type="checkbox"
                        name={name}
                        value={id}
                        onClick={onCheckboxClick}
                      />
                      <AiFillEdit className={s.editIcon} />
                      <AiTwotoneDelete className={s.deleteIcon} />
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
        </section>
      );

    default:
      break;
  }
};

export default TaskList;
