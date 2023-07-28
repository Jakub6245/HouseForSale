import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  const { currentUser, setCurrentUser } = useAuthContext();
  console.log(currentUser);
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <div className={styles.nav__container__left}>
          <li className={styles.nav__list__child}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.nav__list__child}>
            <Link href="/houses/my-houses">My houses</Link>
          </li>
          <li className={styles.nav__list__child}>
            <Link href="/houses/add-house">Add house offer</Link>
          </li>
        </div>
        {!currentUser && (
          <div className={styles.nav__container__right}>
            <li className={styles.nav__list__child}>
              <Link href="/login">Login</Link>
            </li>
            <li className={styles.nav__list__child}>
              <Link href="/register">Register</Link>
            </li>
          </div>
        )}
        {currentUser && (
          <button
            className={styles.nav__button}
            onClick={() => setCurrentUser(null)}
          >
            Sign Out
          </button>
        )}
      </ul>
    </nav>
  );
}
