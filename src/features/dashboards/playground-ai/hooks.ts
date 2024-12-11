import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { OpenAiResponse, SettingsStoreType, Message } from "./types";
import { fetchOpenAi } from "./fetchOpenAi";

export const useOpenAi = (
  options?: UseMutationOptions<
    OpenAiResponse,
    Error,
    { messages: Message[]; settings: SettingsStoreType }
  >,
) => {
  return useMutation<OpenAiResponse, Error, Parameters<typeof fetchOpenAi>[0]>({
    mutationFn: fetchOpenAi,
    ...options,
  });
};
