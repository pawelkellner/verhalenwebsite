"use client";

export interface State {
  showSearchBar: boolean;
}

export enum ActionTypes {
  TOGGLE_SEARCH_BAR = "TOGGLE_SEARCH_BAR",
}

export interface Action {
  type: ActionTypes.TOGGLE_SEARCH_BAR;
  value: boolean;
}

export const initialState: State = {
  showSearchBar: true,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SEARCH_BAR:
      return {
        ...state,
        showSearchBar: action.value,
      };
    default:
      return state;
  }
};
