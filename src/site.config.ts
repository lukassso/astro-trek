import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { PortfolioItem, MenuLink } from "@/types";

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Object Detection",
    description: "A real-time image object detection application using your webcam.",
    technologies: ["React", "Typescript", "react-webcam", "Coco-ssd", "Tensorflow.js"],
    imageUrl: "assets/images/portfolio-webcam-detection.png",
    path: "/webcam-object-detection",
  },
  {
    title: "Playground AI",
    description:
      "A user-friendly interface integrating OpenAI's ChatGPT, allowing interactive AI model settings and responses",
    technologies: ["React", "Typescript", "Tailwind CSS", "Shadcn UI", "Radix UI", "OpenAI API"],
    imageUrl: "assets/images/portfolio-playground-ai.png",
    path: "/dashboards/playground-ai",
  },
  {
    title: "Pose Detection",
    description: "A real-time image pose detection application using your webcam.",
    technologies: ["React", "Typescript", "Tensorflow.js"],
    imageUrl: "assets/images/portfolio-webcam-pose-detection.png",
    path: "/webcam-pose-detection",
  },
  {
    title: "Currency Explorer",
    description: "An app to display and analyze NBP currency exchange rates.",
    technologies: ["React", "SCSS", "Rest API", "Chart.js", "React Router", "Date Fns"],
    imageUrl: "assets/images/portfolio-nbp-currency-explorer.gif",
    path: "/nbp-currency-explorer",
  },
  {
    title: "Multi Select Component",
    description: "A component for displaying and selecting multiple options.",
    technologies: ["React", "Typescript", "Cmdk", "Tailwind CSS", "Radix UI", "React Select"],
    imageUrl: "assets/images/portfolio-multi-select.png",
    path: "/multi-select",
  },
  {
    title: "Bank Transactions",
    description:
      "An application for viewing bank transactions with options to add, delete, and search transactions.",
    technologies: [
      "React",
      "Typescript",
      "Tailwind CSS",
      "Radix UI",
      "React Hook Form",
      "Yup",
      "useContext",
      "useReducer",
    ],
    imageUrl: "assets/images/portfolio-bank-transaction.png",
    path: "/dashboards/bank-transactions",
  },
  {
    title: "Movie App",
    description:
      "Introduced a new movie app with functionalities including home page, movie details, movie list, search bar, pagination, and loading overlay.",
    technologies: [
      "React",
      "Typescript",
      "MobX",
      "Tailwind CSS",
      "Radix UI",
      "Rest API",
      "React Query",
      "React Router",
      "Playwright",
    ],
    imageUrl: "assets/images/portfolio-movie-app.png",
    path: "/movie-app",
  },

  {
    title: "Task Manager",
    description:
      "Task management tool that simplifies daily organization and enhances productivity.",
    technologies: ["React", "Typescript", "react-redux", "@reduxjs/toolkit", "Context API"],
    imageUrl: "assets/images/portfolio-task-manager.png",
    path: "/task-manager",
  },
  {
    title: "SVG Anime Universe",
    description: "Homepage view of an anime service with advanced SVG animation of moving circles.",
    technologies: ["React", "Typescript", "SVG API", "CSS"],
    imageUrl: "assets/images/portfolio-svg-anime.png",
    path: "/svg-anime-universe",
  },
  {
    title: "Firebase Auth",
    description: "Homepage view of an authentication service with Firebase.",
    technologies: ["Firebase API", "Rest API", "React Hook Form", "Zod validation", "Astro Router"],
    imageUrl: "assets/images/portfolio-firebase-auth.png",
    path: "/firebase-auth/signin",
  },
  {
    title: "Hacker News",
    description: "A minimalist Hacker News client that facilitates access to technological news.",
    technologies: ["React", "Typescript", "Tailwind CSS", "Rest API", "Context API", "useReducer"],
    imageUrl: "assets/images/portfolio-hacker-news.png",
    path: "/hacker-news",
  },
  {
    title: "Random Person",
    description:
      "A random profile generator for testing purposes, complete with contact details and a photograph.",
    technologies: ["React", "Typescript", "react-icons", "Rest API", "Tailwind CSS"],
    imageUrl: "assets/images/portfolio-random-person.png",
    path: "/random-person",
  },

  {
    title: "Framer Parallax",
    description: "Homepage teaser with a parallax effect, showcasing dynamic scroll animations.",
    technologies: ["React", "Typescript", "Framer Motion", "Tailwind CSS"],
    imageUrl: "assets/images/portfolio-framer-parallax.png",
    path: "/framer-parallax",
  },
];

// Used to generate links in both the Header & Footer.
export const menuLinks: MenuLink[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "App Suite",
    subLinks: portfolioItems.map((item) => ({
      title: item.title,
      path: item.path,
      description: item.title,
    })),
  },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
  // One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
  themes: ["dracula", "github-light"],
  themeCssSelector(theme, { styleVariants }) {
    // If one dark and one light theme are available
    // generate theme CSS selectors compatible with cactus-theme dark mode switch
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
      if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
    }
    // return default selector
    return `[data-theme="${theme.name}"]`;
  },
  useThemedScrollbars: false,
  styleOverrides: {
    frames: {
      frameBoxShadowCssValue: "none",
    },
    uiLineHeight: "inherit",
    codeFontSize: "0.875rem",
    codeLineHeight: "1.7142857rem",
    borderRadius: "4px",
    codePaddingInline: "1rem",
    codeFontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
};
