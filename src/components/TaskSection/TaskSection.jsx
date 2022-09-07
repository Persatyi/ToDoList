import s from "./TaskSection.module.css";
import Container from "components/Container";
import TaskList from "components/TaskList";

import { BsListTask } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { useState } from "react";

const TaskSection = ({ data, setState }) => {
  const [type, setType] = useState("toDo");

  return (
    <>
      <section className={s.btnSection}>
        <Container className={s.wrapper}>
          <button
            className={s.sectionBtn}
            type="button"
            onClick={() => setType("toDo")}
          >
            <BsListTask className={s.btnIcon} />
            to do
          </button>
          <button
            className={s.sectionBtn}
            type="button"
            onClick={() => setType("done")}
          >
            <BiTask className={s.btnIcon} />
            done
          </button>
          <button
            className={s.sectionBtn}
            type="button"
            onClick={() => setType("all")}
          >
            <FaTasks className={s.btnIcon} />
            all
          </button>
        </Container>
      </section>
      <TaskList data={data} setState={setState} section={type} />
    </>
  );
};

export default TaskSection;
