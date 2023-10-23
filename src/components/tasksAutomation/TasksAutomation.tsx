import React, { useState, useEffect } from "react";
import { fetchToken, fetchTask, postAnswer } from "../../services/apiCall";

export default function TasksAutomation() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [task, setTask] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    fetchToken("helloapi")
      .then((responseData) => {
        setToken(responseData.token);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (token) {
      fetchTask(token)
        .then((responseData) => {
          setTask(responseData.cookie);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [token]);

  useEffect(() => {
    if (task) {
      postAnswer(token, task)
        .then((responseData) => {
          setAnswer(responseData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [task, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(token);
  console.log(task);
  console.log(answer);

  return (
    <div>
      {/* Display your data here, for now, we'll just stringify it */}
      <pre>{JSON.stringify(token, null, 2)}</pre>
      <pre>{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
}
