import { Card, CardHeader, CardContent } from "@/components/ui/card-spring";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/types";

interface PortfolioCardProps {
  app: PortfolioItem;
  technologies: string[];
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ app, technologies }) => {
  return (
    <Card className="dark:bg-slate-950">
      <CardHeader>
        <a href={app.path}>
          <img
            src={app.imageUrl}
            alt={`${app.title} Screenshot`}
            width={500}
            height={300}
            className="w-full cursor-pointer rounded-t-lg object-cover"
          />
        </a>
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-center gap-2 overflow-hidden">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="whitespace-nowrap rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800"
            >
              {tech}
            </div>
          ))}
        </div>
        <h3 className="text-lg font-bold">{app.title}</h3>
        <div className="flex justify-center py-2">
          <a href={app.path} className="w-full sm:w-1/2">
            <Button className="w-full">View App</Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
