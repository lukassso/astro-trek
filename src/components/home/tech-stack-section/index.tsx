import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card-spring";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { technologies } from "./technologies";

function TechStack() {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const grouped = technologies.reduce<Record<string, typeof technologies>>((acc, tech) => {
    acc[tech.category] = acc[tech.category] || [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <Card className="w-full rounded-2xl bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0] py-10 dark:from-gray-950 dark:to-gray-700 sm:-mt-40 md:-mt-60">
      <div className="container flex flex-col gap-8 px-4 md:px-6">
        <div className="grid items-center justify-center space-y-3 text-center ">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The Tech Stack
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Technologies that power my work
          </p>
        </div>

        <Tabs defaultValue={categories[0]} className="w-full">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:flex sm:justify-center">
            <TabsList className="bg-muted scrollbar-none inline-flex w-max rounded-xl p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground snap-center whitespace-nowrap rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TooltipProvider>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="my-6 flex flex-wrap justify-center gap-x-4 gap-y-6 sm:my-10">
                  {grouped[category].map((tech) => {
                    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
                    const [tooltipOpen, setTooltipOpen] = useState(false);

                    const handleToggleTooltip = () => {
                      if (isTouch) {
                        setTooltipOpen((prev) => !prev);
                      }
                    };

                    return (
                      <motion.div
                        key={tech.name}
                        onHoverStart={() => !isTouch && setHoveredName(tech.name)}
                        onHoverEnd={() => !isTouch && setHoveredName(null)}
                        whileHover={{
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 400, damping: 10 },
                        }}
                      >
                        <Tooltip
                          open={isTouch ? tooltipOpen : undefined}
                          onOpenChange={setTooltipOpen}
                        >
                          <TooltipTrigger asChild>
                            <motion.div
                              onClick={handleToggleTooltip}
                              animate={{
                                y: hoveredName === tech.name ? -6 : 0,
                              }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              <Avatar className="h-12 w-12 cursor-pointer border-2 border-white dark:border-gray-800">
                                <AvatarImage src={tech.image} alt={tech.name} />
                              </Avatar>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="border-neutral-700 bg-neutral-800 text-white"
                          >
                            {tech.name}
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </TooltipProvider>
        </Tabs>
      </div>
    </Card>
  );
}

export default TechStack;
