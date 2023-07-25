import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/config";

export default function Register() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          name="email"
          value={inputs.email}
          type="email"
          onChange={handleInputs}
        />
        <label>Password:</label>
        <input
          name="password"
          value={inputs.password}
          type="password"
          onChange={handleInputs}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
