/** @format */

import { useReducer } from "react";
import type { Launch } from "../types/launch";

type State = {
  launches: Launch[];
  loading: boolean;
  error: string | null;
  selectedLaunch: Launch | null;
  modalOpen: boolean;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Launch[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SELECT_LAUNCH"; payload: Launch | null }
  | { type: "SET_MODAL_OPEN"; payload: boolean };

const initialState: State = {
  launches: [],
  loading: false,
  error: null,
  selectedLaunch: null,
  modalOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, launches: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SELECT_LAUNCH":
      return { ...state, selectedLaunch: action.payload };
    case "SET_MODAL_OPEN":
      return { ...state, modalOpen: action.payload };
    default:
      return state;
  }
}

export const useSpaceXReducer = () => useReducer(reducer, initialState);
