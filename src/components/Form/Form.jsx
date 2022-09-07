import { useEffect, useState } from "react";
import { Formik } from "formik";
import { MdAddTask, MdDescription } from "react-icons/md";
import { nanoid } from "nanoid";

import s from "./Form.module.css";
import Container from "components/Container";
import { createSchema } from "assets/schemas/taskSchema";
import { get, save, taskKey } from "localStorage/localStorage";

const initialValues = {
  name: "",
  description: "",
};

const Form = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    const dataBase = await get(taskKey);

    if (dataBase) {
      setState(dataBase);
    }
  };

  const onSubmit = async (values, e) => {
    const data = { ...values, time: Date.now(), id: nanoid(), isDone: false };
    const dataBase = await get(taskKey);

    if (!dataBase) {
      await save(taskKey, [data]);
      e.resetForm();
    } else {
      await save(taskKey, [...dataBase, data]);
      e.resetForm();
    }
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={createSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <form className={s.form} onSubmit={handleSubmit} id="create-task">
            <h2 className={s.title}>Create new task</h2>
            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="name">
                name <span className={s.required}>*</span>
              </label>
              <input
                id="name"
                type="text"
                className={s.input}
                placeholder="Type task name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <MdAddTask className={s.icon} />
            </div>
            {touched.name && errors.name && (
              <div className={s.errorWrapper}>
                <p className={s.error}>{errors.name}</p>
              </div>
            )}
            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="description">
                description
              </label>
              <input
                id="description"
                type="text"
                className={s.input}
                placeholder="Type task description"
                onChange={handleChange}
                value={values.description}
              />
              <MdDescription className={s.icon} />
            </div>
            <button
              type="submit"
              className={s.button}
              disabled={!isValid && !dirty}
            >
              create
            </button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Form;
