import { Card } from "@/components/ui/card-spring";

function TechStack() {
      return (
        <Card className="w-full rounded-2xl bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0] py-6 dark:from-gray-950 dark:to-gray-700 sm:-mt-40 md:-mt-60">
          <div className="container flex flex-col items-center px-4 text-center md:px-6">
            <div className="relative w-full">
              <h3 className="text-xl font-semibold">Our Technology Stack</h3>
              <ul className="mt-4">
                <li>React</li>
                <li>TypeScript</li>
                <li>Node.js</li>
                <li>GraphQL</li>
              </ul>
            </div>
          </div>
        </Card>

      );
}

export default TechStack;