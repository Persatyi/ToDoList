import * as yup from "yup";

const createSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Should be at least 3 letters")
    .max(64, "Should be not more than 64 letters")
    .required("Name is required"),
});

export { createSchema };
