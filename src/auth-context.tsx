"use client";
import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { reducer, initialState, Action, State } from "./store/auth-reducer";

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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
