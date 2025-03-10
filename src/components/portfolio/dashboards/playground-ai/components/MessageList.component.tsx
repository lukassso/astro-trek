import { Skeleton } from "@/components/ui/skeleton";
import type { Message } from "@/features/dashboards/playground-ai/types";

export const MessageListComponent: React.FC<{
  messages: Message[];
  formatText: (text: string | undefined) => JSX.Element[] | undefined;
}> = ({ messages, formatText }) => (
  <>
    {messages.map((msg, index) => (
      <div key={index} className="flex flex-col">
        <div className="flex justify-start">
          <div
            className="mb-2 max-w-full rounded-md bg-green-100 p-4 text-sm shadow-sm dark:bg-green-700"
            style={{ marginRight: "auto" }}
          >
            {msg.userMessage}
          </div>
        </div>
        <div className="flex justify-end">
          {msg.pending ? (
            <Skeleton
              className="mb-2 min-h-[50px] min-w-[100%] max-w-full rounded-md bg-gray-100 p-4 text-sm shadow-sm dark:bg-gray-700"
              style={{ marginLeft: "auto" }}
            />
          ) : (
            <div
              className="mb-2 max-w-full rounded-md bg-gray-100 p-4 text-sm shadow-sm dark:bg-gray-700"
              style={{ marginLeft: "auto" }}
            >
              {formatText(msg.aiMessage)}
            </div>
          )}
        </div>
      </div>
    ))}
  </>
);
