import { ChatCompletion } from "../../types/types";

export const processTask = async (task: any) => {
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const endpoint = "https://api.openai.com/v1/chat/completions";
  console.log("task", task);
  debugger;

  const fetchOpenAI = async (inputText: string) => {
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: `${inputText}`,
        },
        {
          role: "assistant",
          content: "",
        },
      ],
    };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  };

  const processBlogger = async (textArray: string[]) => {
    try {
      console.log("textArray", textArray);
      const results = await Promise.all(textArray.map(fetchOpenAI)).then(
        (result) => result
      );
      return results;
    } catch (error) {
      console.error("Error processing text array:", error);
      throw error;
    }
  };

  try {
    const bloggerResults: ChatCompletion[] = await processBlogger(task.blog);
    const finalResult = bloggerResults.map(
      (result) => result.choices[0].message.content
    );
    console.log("bloggerResults", bloggerResults);

    console.log("finalResult", finalResult);
    return finalResult;
  } catch (error) {
    console.error("Error processing task:", error);
    throw error;
  }
};
