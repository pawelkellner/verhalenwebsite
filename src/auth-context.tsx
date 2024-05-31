"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from "react";
import {
  reducer,
  initialState,
  Action,
  State,
  ActionTypes,
} from "./store/auth-reducer";

interface AuthContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isUserAuthenticated =
      localStorage.getItem("isUserAuthenticated") === "true";
    if (isUserAuthenticated) {
      dispatch({
        type: ActionTypes.AUTHENTICATE_USER,
        value: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
