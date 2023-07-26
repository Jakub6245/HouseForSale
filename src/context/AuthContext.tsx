import { auth } from "@/services/config";
import { User, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState, Dispatch, SetStateAction } from "react";

import { useContext, createContext } from "react";

interface IAuthContext {
  children: JSX.Element;
}

interface IContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

const initialState: IContext = {
  currentUser: null,
  setCurrentUser: () => {},
};

const AuthContext = createContext<IContext>(initialState);

export const AuthProvider = ({ children }: IAuthContext) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
