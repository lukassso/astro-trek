import * as React from "react";

import { cn } from "@/utils/shadcn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputName, ...props }, ref) => {
    return (
      <input
        type={type}
        name={inputName}
        className={cn(
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
