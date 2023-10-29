export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
  usage: ChatUsage;
}

interface ChatChoice {
  index: number;
  message: ChatMessage;
  finish_reason: string;
}

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ModerationResponse {
  id: string;
  model: string;
  results: ModerationResult[];
}

interface ModerationResult {
  flagged: boolean;
  categories: ModerationCategories;
  category_scores: ModerationCategoryScores;
}

interface ModerationCategoryScores {
  sexual: number;
  hate: number;
  harassment: number;
  "self-harm": number;
  "sexual/minors": number;
  "hate/threatening": number;
  "violence/graphic": number;
  "self-harm/intent": number;
  "self-harm/instructions": number;
  "harassment/threatening": number;
  violence: number;
}

interface ModerationCategories {
  sexual: boolean;
  hate: boolean;
  harassment: boolean;
  "self-harm": boolean;
  "sexual/minors": boolean;
  "hate/threatening": boolean;
  "violence/graphic": boolean;
  "self-harm/intent": boolean;
  "self-harm/instructions": boolean;
  "harassment/threatening": boolean;
  violence: boolean;
}
