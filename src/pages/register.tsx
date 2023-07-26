import React, { useState } from "react";
import styles from "../styles/pagesStyle/register.module.scss";
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
    <div className={styles.register}>
      <form className={styles.register__form} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          className={styles.register__input}
          name="email"
          value={inputs.email}
          type="email"
          onChange={handleInputs}
        />
        <label>Password:</label>
        <input
          className={styles.register__input}
          name="password"
          value={inputs.password}
          type="password"
          onChange={handleInputs}
        />
        <input className={styles.register__submit} type="submit" />
      </form>
    </div>
  );
}
