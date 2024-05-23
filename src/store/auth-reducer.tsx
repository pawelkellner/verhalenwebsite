"use client";

export interface State {
  isUserAuthenticated: boolean;
}

export enum ActionTypes {
  AUTHENTICATE_USER = "AUTHENTICATE_USER",
}

export interface Action {
  type: ActionTypes.AUTHENTICATE_USER;
  value: boolean;
}

export const initialState: State = {
  isUserAuthenticated: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_USER:
      return {
        ...state,
        isUserAuthenticated: action.value,
      };
    default:
      return state;
  }
};
