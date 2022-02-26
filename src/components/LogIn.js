import React from "react";
import useForm from "../utils/useForm";
import { GlobalContext } from "../App";
import jwt_decode from "jwt-decode";

export default function LogIn() {
  const { globalState, setGlobalState } = React.useContext(GlobalContext);
  const { url } = globalState;
  const { inputs, handleChange, clearForm } = useForm({
    username: "",
    password: "",
  });

  const logInUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();
    const { user_id } = jwt_decode(data.access);

    clearForm();
    setGlobalState({ ...globalState, token: data.access, id: user_id });
  };

  return (
    <form onSubmit={logInUser}>
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
      <button type="submit" aria-label="log in">
        Log In
      </button>
    </form>
  );
}
