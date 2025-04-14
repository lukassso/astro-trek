import { cn } from "@/utils/shadcn";
import { useStarfield } from "@/components/home/use-starfield";
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"

// Technology stack data with actual logos
const technologies = [
  {
    name: "React",
    image: "/placeholder.svg?height=40&width=40",
    color: "bg-blue-500",
    fallback: "R",
    description: "A JavaScript library for building user interfaces",
  },
  {
    name: "Next.js",
    image: "/placeholder.svg?height=40&width=40",
    color: "bg-black",
    fallback: "N",
    description: "The React framework for production",
  },
  {
    name: "TypeScript",
    image: "/placeholder.svg?height=40&width=40",
    color: "bg-blue-600",
    fallback: "TS",
    description: "Strongly typed programming language that builds on JavaScript",
  },
  {
    name: "Tailwind",
    image: "/placeholder.svg?height=40&width=40",
    color: "bg-sky-400",
    fallback: "TW",
    description: "A utility-first CSS framework",
  },
  {
    name: "Framer Motion",
    image: "/placeholder.svg?height=40&width=40",
    color: "bg-purple-500",
    fallback: "FM",
    description: "A production-ready motion library for React",
  },
]

interface ServiceItemProps {
  title: string;
  className?: string;
}

function ServiceItem({ title, className }: ServiceItemProps) {
  return (
    <div className={cn("text-3xl font-light tracking-tight md:text-7xl", className)}>
      #{title}
    </div>
  );
}

export default function ServicesSection() {
  const services = ["Web Development", "Product Design", "AI Prototyping", "Data Processing"];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedTech, setSelectedTech] = useState<number | null>(null)

  useStarfield({
    containerId: "starfield-services",
    canvasId: "starfield-canvas-services"
  });

  return (
    <section className="relative w-full bg-transparent py-12 md:py-24">
      <div id="starfield-services" className="absolute inset-0 h-full w-full">
        <canvas id="starfield-canvas-services" className="h-full w-full" />
      </div>
      <div className="relative grid gap-10 px-4 text-center md:px-14">
        <div className="flex flex-col items-start space-y-6 text-white md:space-y-14">
          {services.map((service) => (
            <ServiceItem key={service} title={service} />
          ))}
        </div>
      </div>
      <div className="relative w-full overflow-hidden bg-background py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4"
              style={{
                WebkitTextStroke: "1px rgb(156 163 175)", // tailwind gray-400
              }}
            >
              Flowers & Saints
            </span>
          </div>
        ))}
      </motion.div>
    </div>
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <h2 className="text-2xl font-bold">Our Tech Stack</h2>

      <div className="relative">
        <TooltipProvider>
          <div className="flex items-center">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="relative"
                style={{
                  zIndex: hoveredIndex === index ? 10 : technologies.length - index,
                  marginLeft: index === 0 ? 0 : "-12px",
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: selectedTech === index ? 1.2 : 1,
                }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{
                  scale: 1.15,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                onClick={() => setSelectedTech(selectedTech === index ? null : index)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      animate={{
                        y: hoveredIndex === index ? -8 : 0,
                        boxShadow:
                          hoveredIndex === index || selectedTech === index
                            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 cursor-pointer">
                        <AvatarImage src={tech.image} alt={tech.name} />
                        <AvatarFallback className={tech.color}>{tech.fallback}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-neutral-800 text-white border-neutral-700">
                    {tech.name}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>

        <AnimatePresence>
          {selectedTech !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-8"
            >
              <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={technologies[selectedTech].image} alt={technologies[selectedTech].name} />
                      <AvatarFallback className={technologies[selectedTech].color}>
                        {technologies[selectedTech].fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{technologies[selectedTech].name}</h3>
                      <p className="text-sm text-muted-foreground">{technologies[selectedTech].description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </section>
  );
}
