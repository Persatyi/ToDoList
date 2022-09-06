import s from "./Header.module.css";
import Container from "components/Container";

const Header = () => {
  return (
    <section className={s.header}>
      <Container>
        <h1 className={s.title}>To-Do List</h1>
      </Container>
    </section>
  );
};

export default Header;
