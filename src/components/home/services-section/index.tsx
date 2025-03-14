import { cn } from "@/utils/shadcn";
import { useStarfield } from "@/components/home/use-starfield";
import {motion} from 'framer-motion'

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
    </section>
  );
}
