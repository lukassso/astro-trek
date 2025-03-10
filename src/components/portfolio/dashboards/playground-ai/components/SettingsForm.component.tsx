import React from "react";
import { useSettings } from "@/features/dashboards/playground-ai/SettingsContext";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Rabbit, Bird, Turtle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { observer } from "mobx-react-lite";

export const SettingsFormComponent: React.FC = observer(() => {
  const settings = useSettings();
  const { temperature, topP } = settings;

  const handleTemperatureChange = (value: number[]) => {
    settings.temperature = value[0];
  };

  const handleTopPChange = (value: number[]) => {
    settings.topP = value[0];
  };

  return (
    <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0 md:p-0">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        <div className="grid gap-3">
          <Label htmlFor="model">Model</Label>
          <Select defaultValue="genesis">
            <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genesis">
                <div className="text-muted-foreground flex items-start gap-3">
                  <Rabbit className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      Neural <span className="text-foreground font-medium">Genesis</span>
                    </p>
                    <p className="text-xs" data-description>
                      Our fastest model for general use cases.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="explorer">
                <div className="text-muted-foreground flex items-start gap-3">
                  <Bird className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      Neural <span className="text-foreground font-medium">Explorer</span>
                    </p>
                    <p className="text-xs" data-description>
                      Performance and speed for efficiency.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="quantum">
                <div className="text-muted-foreground flex items-start gap-3">
                  <Turtle className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      Neural <span className="text-foreground font-medium">Quantum</span>
                    </p>
                    <p className="text-xs" data-description>
                      The most powerful model for complex computations.
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative grid gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="temperature" className="item-start flex">
                  Temperature <span className="w-full text-end">{temperature.toFixed(2)} </span>
                </Label>
              </TooltipTrigger>
              <TooltipTrigger asChild>
                <Slider
                  defaultValue={[temperature]}
                  name="temperature"
                  min={0}
                  max={2}
                  step={0.01}
                  onValueChange={handleTemperatureChange}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[300px] bg-default " sideOffset={34}>
                Controls randomness: Lowering results in less random completions. As the temperature
                approaches zero, the model will become deterministic and repetitive
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="topP" className="item-start flex">
                  TopP<span className="w-full text-end">{topP.toFixed(2)} </span>
                </Label>
              </TooltipTrigger>
              <TooltipTrigger asChild>
                <Slider
                  defaultValue={[topP]}
                  name="topP"
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleTopPChange}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[300px] bg-default " sideOffset={34}>
                Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted
                options are considered.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </fieldset>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
        <div className="grid gap-3">
          <Label htmlFor="role">Role</Label>
          <Select disabled defaultValue="system">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="assistant">Assistant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="content">Instruction</Label>
          <Textarea disabled id="content" placeholder="You are a..." />
        </div>
      </fieldset>
    </form>
  );
});
