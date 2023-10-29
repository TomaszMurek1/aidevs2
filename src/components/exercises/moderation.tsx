import React from "react";

const fetchModerations = async (inputText: string) => {
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ input: inputText }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

const processTextArray = async (textArray: string[]) => {
  try {
    console.log("textArray", textArray);
    const results = await Promise.all(textArray.map(fetchModerations)).then(
      (result) => result
    );
    return results;
  } catch (error) {
    console.error("Error processing text array:", error);
    throw error;
  }
};

export const processTask = async (task: any) => {
  // ... your processing logic for the task

  // Example: Run processTextArray and return the result
  try {
    const moderationResults = await processTextArray(task.input);
    console.log("moderationResult", moderationResults);
    const finalResult = moderationResults.map((result) =>
      result.results[0].flagged ? 1 : 0
    );
    console.log("finalResult", finalResult);
    return finalResult;
  } catch (error) {
    console.error("Error processing task:", error);
    throw error;
  }
};
