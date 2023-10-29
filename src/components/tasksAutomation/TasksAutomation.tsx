import React, { useReducer, Reducer } from "react";
import { Button } from "@mui/material";
import {
  fetchToken,
  fetchTask,
  postAnswer,
  postAnswerAndProcess,
} from "../../services/apiCall";
import { taskReducer, initialState, Action } from "../../reducer/taskReducer";
import { State } from "../../reducer/taskReducer";

export default function TasksAutomation() {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    taskReducer,
    initialState
  );

  const taskName = "moderation";

  const runTasks = async () => {
    try {
      const tokenData = await fetchToken(taskName);
      dispatch({ type: "SET_TOKEN", payload: tokenData.token });

      const taskData = await fetchTask(tokenData.token);
      dispatch({ type: "SET_TASK", payload: taskData.msg });

      const answerData = await postAnswerAndProcess(
        tokenData.token,
        taskName,
        taskData
      );
      dispatch({ type: "SET_ANSWER", payload: answerData.note });
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const { token, task, answer, loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("answer", answer);

  return (
    <div>
      {/* Display your data here */}
      <pre>token: {JSON.stringify(token, null, 2)}</pre>
      <pre>task: {JSON.stringify(task, null, 2)}</pre>
      <pre>answer: {JSON.stringify(answer, null, 2)}</pre>
      <Button variant="contained" color="primary" onClick={runTasks}>
        Run Tasks
      </Button>
    </div>
  );
}
