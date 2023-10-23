export type State = {
  token: string;
  task: string | null;
  answer: string | null;
  loading: boolean;
  error: string | null;
};

export type Action =
  | { type: "SET_TOKEN"; payload: string }
  | { type: "SET_TASK"; payload: string }
  | { type: "SET_ANSWER"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

export const initialState: State = {
  token: "",
  task: null,
  answer: null,
  loading: true,
  error: null,
};

export function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_TASK":
      return { ...state, task: action.payload };
    case "SET_ANSWER":
      return { ...state, answer: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
