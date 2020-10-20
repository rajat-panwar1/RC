import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const RadioButton = (props) => {
  const { htmlFor, label, name } = props;

  return (
    <div>
      <label htmlFor={htmlFor} className="mb-0">
        {label}
      </label>
      <br />
      <label className="mr-1">
        <Field type="radio" name={name} value="Male" className="mr-1" />
        Male
      </label>
      <label className="mr-1">
        <Field type="radio" name={name} value="Female" className="mr-1" />
        Female
      </label>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButton;