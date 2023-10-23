import React, { useEffect, useReducer, Reducer } from "react";
import { fetchToken, fetchTask, postAnswer } from "../../services/apiCall";
import { taskReducer, initialState, Action } from "../../reducer/taskReducer"; // adjust the path based on your folder structure
import { State } from "../../reducer/taskReducer";

export default function TasksAutomation() {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    taskReducer,
    initialState
  );

  useEffect(() => {
    const runTasks = async () => {
      try {
        const tokenData = await fetchToken("helloapi");
        dispatch({ type: "SET_TOKEN", payload: tokenData.token });

        const taskData = await fetchTask(tokenData.token);
        dispatch({ type: "SET_TASK", payload: taskData.cookie });

        const answerData = await postAnswer(tokenData.token, taskData.cookie);
        console.log("answerData", answerData);
        dispatch({ type: "SET_ANSWER", payload: answerData.note }); // assuming the field name is 'answer'
      } catch (err: any) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    runTasks();
  }, []);

  const { token, task, answer, loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("answer", answer);

  return (
    <div>
      {/* Display your data here, for now, we'll just stringify it */}
      <pre>token: {JSON.stringify(token, null, 2)}</pre>
      <pre>task: {JSON.stringify(task, null, 2)}</pre>
      <pre>answer: {JSON.stringify(answer, null, 2)}</pre>
    </div>
  );
}
