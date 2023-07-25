import { auth } from "@/services/config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { useContext, createContext } from "react";

interface IAuthContext {
  children: JSX.Element;
}

interface IContext {
  currentUser: User | null;
}

const initialState: IContext = {
  currentUser: null,
};

const AuthContext = createContext<IContext>(initialState);

export const AuthProvider = ({ children }: IAuthContext) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  

  useEffect(() => {
    onAuthStateChanged(auth, setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
