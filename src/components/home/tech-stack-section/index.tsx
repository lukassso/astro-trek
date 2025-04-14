import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
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
        <h3 className="text-center text-xl font-semibold">Our Technology Stack</h3>

        <Tabs defaultValue={categories[0]} className="w-full">
          <div className="flex justify-center">
          <TabsList className="flex w-full max-w-full overflow-x-auto scroll-mx-4 pl-4 pr-4 scrollbar-none rounded-xl bg-muted p-1 sm:w-max sm:mx-auto snap-x snap-mandatory">
              {categories.map((category) => (
                <TabsTrigger
                key={category}
                value={category}
                className="snap-center whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground rounded-xl"
              >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div> 

          <TooltipProvider>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-6">
                  {grouped[category].map((tech) => (
                    <motion.div
                      key={tech.name}
                      onHoverStart={() => setHoveredName(tech.name)}
                      onHoverEnd={() => setHoveredName(null)}
                      whileHover={{
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400, damping: 10 },
                      }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
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
                  ))}
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
