import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDgJ_SAItO2-BNwZOvCDqHqkw0ys6GE7s",
  authDomain: "housesforsale-b567b.firebaseapp.com",
  projectId: "housesforsale-b567b",
  storageBucket: "housesforsale-b567b.appspot.com",
  messagingSenderId: "392054660029",
  appId: "1:392054660029:web:4bb542bacf92b187ee50d4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);
const auth = getAuth(app);
const storage = firebase.storage();
const firestore = firebase.firestore();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const providers = { googleProvider, githubProvider, facebookProvider };

export { auth, providers, dataBase, firestore, storage };
export default getFirestore(app);
