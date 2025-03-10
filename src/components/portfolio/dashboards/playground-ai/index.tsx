import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PlaygroundAiComponent } from "./PlaygroundAi.component";
import { SettingsProvider } from "@/features/dashboards/playground-ai/SettingsContext";

const PlaygroundAiAppComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <PlaygroundAiComponent />
        <ReactQueryDevtools initialIsOpen={false} />
      </SettingsProvider>
    </QueryClientProvider>
  );
};

export default PlaygroundAiAppComponent;
