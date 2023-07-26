import React, { useState } from "react";
import { auth, providers } from "@/services/config";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import styles from "../styles/pagesStyle/login.module.scss";

type ProviderType =
  | GoogleAuthProvider
  | GithubAuthProvider
  | FacebookAuthProvider;

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { currentUser, setCurrentUser } = useAuthContext();
  const router = useRouter();
  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };
  // if (currentUser) router.push("/");

  const logInWith = (provider: ProviderType) => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setCurrentUser(data.user);
        router.push("/");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      router.push("/");
      setCurrentUser(user.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          className={styles.login__input}
          name="email"
          value={inputs.email}
          type="email"
          onChange={handleInputs}
        />
        <label>Password:</label>
        <input
          className={styles.login__input}
          name="password"
          value={inputs.password}
          type="password"
          onChange={handleInputs}
        />
        <input className={styles.login__submit} type="submit" />
      </form>
      <div className={styles.login__button__container}>
        <button
          className={styles.login__button}
          onClick={() => logInWith(providers.googleProvider)}
        >
          Sign with google
        </button>
        <button
          className={styles.login__button}
          onClick={() => logInWith(providers.githubProvider)}
        >
          Sign with facebook
        </button>
        <button
          className={styles.login__button}
          onClick={() => logInWith(providers.facebookProvider)}
        >
          Sign with github
        </button>
      </div>
    </div>
  );
}
