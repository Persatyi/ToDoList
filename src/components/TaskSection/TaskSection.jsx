import { BsListTask } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";

import s from "./TaskSection.module.css";
import Container from "components/Container";
import TaskList from "components/TaskList";

const TaskSection = ({ data = [], setState }) => {
  const [type, setType] = useState("toDo");

  const btnHandler = (type) => {
    setType(type);
  };

  return (
    <>
      <section className={s.btnSection}>
        <Container className={s.wrapper}>
          <button
            className={s.sectionBtn}
            type="button"
            onClick={() => btnHandler("toDo")}
          >
            <BsListTask className={s.btnIcon} />
            to do ({data.filter((el) => el.isDone === false).length || 0})
          </button>
          <button
            className={s.sectionBtn}
            type="button"
            onClick={() => btnHandler("done")}
          >
            <BiTask className={s.btnIcon} />
            done ({data.filter((el) => el.isDone === true).length || 0})
          </button>
          <button
            className={s.sectionBtn}
            type="button"
            onClick={() => btnHandler("all")}
          >
            <FaTasks className={s.btnIcon} />
            all ({data.length || 0})
          </button>
          <div className={`${s.selected} ${s[type]}`}></div>
        </Container>
      </section>
      <TaskList data={data} setState={setState} type={type} />
    </>
  );
};

TaskSection.propTypes = {
  data: PropTypes.array,
  setState: PropTypes.func,
};

export default TaskSection;
