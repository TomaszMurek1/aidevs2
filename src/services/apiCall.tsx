// helloApi.js

const BASE_URL = "https://zadania.aidevs.pl";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchToken = async (taskName: string) => {
  const response = await fetch(`${BASE_URL}/token/${taskName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apikey: API_KEY }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const fetchTask = async (token: string) => {
  const response = await fetch(`${BASE_URL}/task/${token}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const postAnswer = async (token: string, answer: string) => {
  const response = await fetch(`${BASE_URL}/answer/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer: answer }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
