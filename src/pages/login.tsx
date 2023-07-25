import React, { useState } from "react";
import { auth, providers } from "@/services/config";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

type ProviderType =
  | GoogleAuthProvider
  | GithubAuthProvider
  | FacebookAuthProvider;

const logInWith = (provider: ProviderType) => {
  signInWithPopup(auth, provider)
    .then((data) => console.log(data.user))
    .catch((error) => console.log(error));
};

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      console.log(user);
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
      <button onClick={() => logInWith(providers.googleProvider)}>
        Sign with google
      </button>
      <button onClick={() => logInWith(providers.githubProvider)}>
        Sign with facebook
      </button>
      <button onClick={() => logInWith(providers.facebookProvider)}>
        Sign with github
      </button>
    </div>
  );
}
