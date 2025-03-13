import { cn } from "@/utils/shadcn";
import { useStarfield } from "@/components/home/use-starfield";

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
    </section>
  );
}
