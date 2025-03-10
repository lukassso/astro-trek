import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft, Paperclip, Mic } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import type { MessageInputProps } from "@/features/dashboards/playground-ai/types";

export const MessageInputComponent: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  handleSubmit,
  handleKeyDown,
}) => (
  <form
    className="bg-background focus-within:ring-ring relative mt-2 overflow-hidden rounded-lg border focus-within:border-lime-600"
    onSubmit={handleSubmit}
  >
    <Label htmlFor="message" className="sr-only">
      Message
    </Label>
    <Textarea
      id="message"
      placeholder="Type your message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      className="textarea-playground min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 dark:bg-slate-800"
    />
    <div className="flex items-center bg-white p-3 pt-0 dark:bg-slate-800">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button disabled variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Attach File</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button disabled variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Use Microphone</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button size="sm" className="ml-auto gap-1.5" type="submit">
        Send Message
        <CornerDownLeft className="size-3.5" />
      </Button>
    </div>
  </form>
);
