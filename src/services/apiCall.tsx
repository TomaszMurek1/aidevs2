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

export const fetchOpenAI = async () => {
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  };
  const body = {
    messages: [{ role: "user", content: "Hello!" }],
    model: "gpt-3.5-turbo",
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error: unknown) {
    const e = error as Error;
    console.error("There was a problem with the fetch operation:", e.message);
  }
};
