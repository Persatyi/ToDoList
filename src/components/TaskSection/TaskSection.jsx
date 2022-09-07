import s from "./TaskSection.module.css";
import Container from "components/Container";

import { BsListTask } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";

const TaskSection = () => {
  return (
    <section className={s.btnSection}>
      <Container className={s.wrapper}>
        <button className={s.sectionBtn} type="button">
          <BsListTask className={s.btnIcon} />
          to do
        </button>
        <button className={s.sectionBtn} type="button">
          <BiTask className={s.btnIcon} />
          done
        </button>
        <button className={s.sectionBtn} type="button">
          <FaTasks className={s.btnIcon} />
          all
        </button>
      </Container>
    </section>
  );
};

export default TaskSection;
