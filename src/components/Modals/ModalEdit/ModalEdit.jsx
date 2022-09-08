import { Formik } from "formik";
import { MdAddTask, MdDescription } from "react-icons/md";
import { toast } from "react-toastify";

import s from "./ModalEdit.module.css";
import ModalWrapper from "components/ModalWrapper";
import { createSchema } from "assets/schemas/taskSchema";
import { get, save, taskKey } from "localStorage/localStorage";

const ModalEdit = ({ open, onClose, data = {}, setState }) => {
  const { name, description, id } = data;

  const initialValues = {
    name,
    description,
  };

  const onSubmit = async (values) => {
    const dataBase = await get(taskKey);
    const index = dataBase.findIndex((el) => el.id === id);
    const obj = dataBase[index];
    const newObj = { ...obj, ...values, time: Date.now(), edited: true };
    const copyOfData = [...dataBase];
    copyOfData.splice(index, 1, newObj);

    await save(taskKey, copyOfData);
    setState(copyOfData);
    onClose();
    toast.success("Task successfully edited");
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
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
          <form className={s.editWindow} onSubmit={handleSubmit}>
            <h2 className={s.title}>Edit task</h2>
            <div className={s.inputWrapper}>
              <label className={s.label} htmlFor="name">
                name <span className={s.required}>*</span>
              </label>
              <input
                id="name"
                type="text"
                className={s.input}
                placeholder="Type new task name"
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
              <textarea
                rows="8"
                id="description"
                type="text"
                className={s.inputDescription}
                placeholder="Type task description"
                onChange={handleChange}
                value={values.description}
              ></textarea>
              <MdDescription className={s.icon} />
            </div>
            <div className={s.btnWrapper}>
              <button
                type="submit"
                className={s.button}
                disabled={!isValid && !dirty}
              >
                edit
              </button>
              <button type="button" className={s.button} onClick={onClose}>
                cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default ModalEdit;
