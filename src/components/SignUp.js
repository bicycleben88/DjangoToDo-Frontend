import React from "react";
import useForm from "../utils/useForm";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function SignUp() {
  const { inputs, handleChange } = useForm({
    username: "",
    password: "",
  });

  const createUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(inputs),
    });

    const data = await response.json();
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
