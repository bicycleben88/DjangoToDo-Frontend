import React from "react";

const useForm = (initial = {}) => {
  const [inputs, setInputs] = React.useState(initial);
  const initialValues = Object.values(initial).join("");

  React.useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setInputs(initial);
  };

  return {
    inputs,
    handleChange,
    clearForm,
  };
};

export default useForm;
