import * as React from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { cn } from "@/utils/shadcn";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    let maskImage = useMotionTemplate`radial-gradient(440px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.5), transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };

    return (
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-950 shadow duration-700 dark:border-slate-800  dark:text-slate-50 md:gap-8",
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none">
          <div className="[mask-image:linear-gradient(rgba(0, 0, 0, 0.5), transparent)] duration-800 absolute inset-0 z-0 transition" />
          <motion.div
            className="via-white-80 absolute inset-0 z-10 bg-gradient-to-br from-slate-400 to-transparent opacity-100 transition duration-1000 group-hover:opacity-50"
            style={style}
          />
          <motion.div
            className="absolute inset-0 z-10 opacity-0 mix-blend-normal transition duration-1000 group-hover:opacity-100"
            style={style}
          />
        </div>
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-slate-500 dark:text-slate-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
