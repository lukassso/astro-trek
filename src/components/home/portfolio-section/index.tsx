import { useState, useEffect } from "react";
import PortfolioCard from "./components/PortfolioCard";
import ButtonLoading from "./components/ButtonLoading";
import { Button } from "@/components/ui/button";
import { portfolioItems } from "@/site.config";
import type { PortfolioItem } from "@/types";

export default function PortfolioSection() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [randomTechnologies, setRandomTechnologies] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const initialItems = portfolioItems.slice(0, visibleCount);
    const initialRandomTechnologies = initialItems.reduce(
      (acc, item) => {
        acc[item.title] = getRandomElements(item.technologies || [], 3);
        return acc;
      },
      {} as Record<string, string[]>,
    );
    setItems(initialItems);
    setRandomTechnologies(initialRandomTechnologies);
  }, [visibleCount]);

  const getRandomElements = (arr: string[], numElements: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  };

  const loadMoreItems = () => {
    if (visibleCount >= portfolioItems.length) return;
    setLoading(true);
    setTimeout(() => {
      const newVisibleCount = visibleCount + 3;
      const newItems = portfolioItems.slice(0, newVisibleCount);

      const newRandomTechnologies = { ...randomTechnologies };
      for (const item of newItems) {
        if (!newRandomTechnologies[item.title]) {
          newRandomTechnologies[item.title] = getRandomElements(item.technologies || [], 3);
        }
      }

      setItems(newItems);
      setRandomTechnologies(newRandomTechnologies);
      setVisibleCount(newVisibleCount);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="w-full py-32">
      <div className="grid items-center justify-center gap-4 text-center lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The App Suite
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Take a look at some apps I've built to demonstrate my skills
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((app) => (
            <PortfolioCard
              key={app.title}
              app={app}
              technologies={randomTechnologies[app.title] || []}
            />
          ))}
        </div>
        {loading ? (
          <div className="text-center">
            <ButtonLoading />
          </div>
        ) : (
          visibleCount < portfolioItems.length && (
            <div className="text-center">
              <Button onClick={loadMoreItems}>Load More</Button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
