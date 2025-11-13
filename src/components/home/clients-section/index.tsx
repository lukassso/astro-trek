import React from "react";
import { motion, type Variants } from "framer-motion";
import { logos } from "./logos";
import { useAstroTheme } from "@/hooks/use-app-theme";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const LogoGrid: React.FC = () => {
  const { isDarkMode, mounted } = useAstroTheme();

  return (
    <div className="container flex flex-col gap-8 px-4 pb-12 pt-60 sm:pb-48 md:px-6">
      <div className="grid items-center justify-center space-y-3 text-center ">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Clients</h2>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Trusted by these amazing clients
        </p>
      </div>

      {mounted && (
        <motion.div
          className="grid grid-cols-2 gap-8 p-8 sm:grid-cols-3 md:grid-cols-4 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {logos.map((logo) => (
            <motion.a
              key={logo.alt}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={isDarkMode ? logo.darkSrc : logo.lightSrc}
                alt={logo.alt}
                className="max-h-16 w-auto"
              />
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LogoGrid;
