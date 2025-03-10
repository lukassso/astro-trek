import type { FC } from "react";
import { motion } from "framer-motion";

interface HeaderPorfolioTypes {
  title: string;
  description: string;
  chipsList: string[];
}
const HeaderPortfolio: FC<HeaderPorfolioTypes> = (props) => {
  const { title, description, chipsList } = props;
  return (
    <div className="flex-1">
      <section className="w-full py-32 lg:py-56">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-3"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </motion.div>
          <div className="no-scrollbar flex items-center justify-start gap-2 space-x-2 overflow-x-auto scroll-smooth p-2 pl-4 pr-4 md:justify-center">
            {chipsList.map((chip: string, index: number) => (
              <motion.div
                key={chip}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="min-w-max whitespace-nowrap rounded-full bg-gray-100 px-3 py-2 text-xs font-medium dark:bg-gray-800"
              >
                {chip}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeaderPortfolio;
