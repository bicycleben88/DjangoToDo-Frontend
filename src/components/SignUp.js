import React from "react";
import useForm from "../utils/useForm";
import { GlobalContext } from "../App";

export default function SignUp() {
  const { globalState } = React.useContext(GlobalContext);
  const { url } = globalState;
  const { inputs, handleChange, clearForm } = useForm({
    username: "",
    password: "",
  });

  const createUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();
    clearForm();
  };

  return (
    <form onSubmit={createUser}>
      <label>
        Username:
        <input
          type="text"
          value={inputs.username}
          name="username"
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={inputs.password}
          name="password"
          onChange={handleChange}
        />
      </label>
      <button type="submit" aria-label="create user">
        Create Account
      </button>
    </form>
  );
}
