import React, { useState } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import Button from "@mui/material/Button";

function ChatComponent() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const handleButtonClick = async () => {
    setLoading(true);

    const chat = new ChatOpenAI({
      openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const { content } = await chat.call([new HumanMessage("Hey there!")]);

    setContent(content);
    setLoading(false);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && content && <div>{loading?.toString()}</div>}
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Fetch Chat Content
      </Button>
    </div>
  );
}

export default ChatComponent;
