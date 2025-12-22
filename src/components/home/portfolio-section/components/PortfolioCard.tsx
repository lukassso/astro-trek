import { Card, CardHeader, CardContent } from "@/components/ui/card-spring";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/types";

interface PortfolioCardProps {
  app: PortfolioItem;
  technologies: string[];
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ app, technologies }) => {
  const isExternal = !!app.externalUrl;
  const href = app.externalUrl || app.path;
  const linkProps = isExternal
    ? { target: "_self", rel: "noopener noreferrer" }
    : {};

  return (
    <Card className="dark:bg-slate-950">
      <CardHeader>
        <a href={href} {...linkProps}>
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
          <a href={href} {...linkProps} className="w-full sm:w-1/2">
            <Button className="w-full flex items-center justify-center gap-2">
              {isExternal ? (
                <>
                  Visit Site
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </>
              ) : (
                "View App"
              )}
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
