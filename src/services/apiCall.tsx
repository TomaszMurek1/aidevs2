// helloApi.js

const BASE_URL = "https://zadania.aidevs.pl";
const API_KEY = process.env.REACT_APP_API_KEY;

const fetchAPI = async (url: string, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const fetchToken = async (taskName: string) => {
  return fetchAPI(`${BASE_URL}/token/${taskName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apikey: API_KEY }),
  });
};

export const fetchTask = async (token: string) => {
  return fetchAPI(`${BASE_URL}/task/${token}`);
};

export const postAnswer = async (token: string, answer: string) => {
  return fetchAPI(`${BASE_URL}/answer/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer: answer }),
  });
};
