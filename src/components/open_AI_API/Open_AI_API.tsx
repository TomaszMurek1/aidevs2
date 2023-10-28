import React, { useReducer, Reducer } from "react";
import { fetchOpenAI } from "../../services/apiCall";
import {
  openAIReducer,
  initialState,
  Action,
} from "../../reducer/open_AI_Reducer"; // adjust the path based on your folder structure
import { State } from "../../reducer/taskReducer";

// MUI imports
import { Button, Paper, Typography } from "@mui/material";

export default function OpenAi() {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    openAIReducer,
    initialState
  );

  const handleButtonClick = async () => {
    try {
      const data = await fetchOpenAI();
      dispatch({ type: "SET_ANSWER", payload: data }); // assuming the field name is 'answer'
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const { token, task, answer, loading, error } = state;

  return (
    <div>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : error ? (
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      ) : (
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Fetch Data from OpenAI
        </Button>
      )}
    </div>
  );
}
