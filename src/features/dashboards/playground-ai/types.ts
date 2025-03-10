export interface OpenAiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface OpenAiRequest {
  prompt: string;
}

export interface Message {
  role: "system" | "user" | "assistant";
  userMessage: string;
  aiMessage?: string;
  pending: boolean;
}

export interface SettingsStoreType {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
