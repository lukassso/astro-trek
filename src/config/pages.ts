import type { Props as SeoProps } from "@astrolib/seo";

export type PageSeoConfig = Record<string, SeoProps>;

export const pagesSeo: PageSeoConfig = {
  "index": {
    title: "Custom Web Apps & AI Product Development",
    titleTemplate: "%s | AIGreener",
    description: "I help businesses build & scale ambitious digital products. Specializing in Next.js web apps and rapid AI prototyping. Let's discuss your project.",
  },

  "blog/index": {
    title: "Blog",
    description: "Web development insights, programming tutorials, and experiments with AI. Explore articles on modern web technologies.",
  },

  // === APP SUITE ===
  "bank-transactions": {
    title: "Bank Transactions Dashboard",
    description: "An interactive dashboard to view, add, and search bank transactions. A demo built with React, TypeScript, and modern state management.",
  },
  "playground-ai": {
    title: "AI Playground (ChatGPT)",
    description: "Experiment with OpenAI's ChatGPT through a user-friendly interface. Adjust model settings and see interactive responses in real-time.",
  },
  "firebase-auth": {
    title: "Firebase Authentication Demo",
    description: "A complete authentication flow (sign-in, sign-up, password reset) implemented with Firebase Authentication and Astro.",
  },
  "framer-parallax": {
    title: "Framer Motion Parallax Effect",
    description: "A demonstration of creating a beautiful parallax scroll effect using the Framer Motion animation library in a React/Astro project.",
  },
  "hacker-news": {
    title: "Hacker News Client",
    description: "A minimalist client for browsing Hacker News. A practical example of fetching and displaying data from a REST API in a web app.",
  },
  "movie-app": {
    title: "Movie Discovery App",
    description: "Browse and search for movies using the TMDB API. A feature-rich application demonstrating React Query, routing, and complex state.",
  },
  "multi-select": {
    title: "Advanced Multi-Select Component",
    description: "A reusable, accessible, and powerful multi-select component for React, built with Radix UI and Tailwind CSS.",
  },
  "nbp-currency-explorer": {
    title: "NBP Currency Rate Explorer",
    description: "Analyze and visualize historical currency exchange rates from the National Bank of Poland (NBP) API.",
  },
  "rag-assistant": {
    title: "RAG AI Assistant",
    description: "A proof-of-concept AI assistant using the RAG (Retrieval-Augmented Generation) pattern to answer questions based on a specific knowledge base.",
  },
  "random-person": {
    title: "Random Person Generator",
    description: "A simple tool for developers and testers to generate random user profiles for testing purposes.",
  },
  "svg-anime-universe": {
    title: "SVG Animation Showcase",
    description: "An example of advanced SVG animations creating a dynamic and engaging user interface.",
  },
  "task-manager": {
    title: "Task Manager App",
    description: "A classic task manager application to demonstrate core concepts of state management with Redux Toolkit or Context API.",
  },
  "url-scraper": {
    title: "Web Scraper Tool",
    description: "A simple web scraper application to extract data from a given URL. A demonstration of server-side functionality in a web app.",
  },
  "webcam-object-detection": {
    title: "Real-Time Object Detection",
    description: "A web application using TensorFlow.js to perform real-time object detection directly in your browser via your webcam.",
  },
  "webcam-pose-detection": {
    title: "Real-Time Pose Detection",
    description: "A web application using TensorFlow.js to perform real-time human pose detection and estimation in the browser.",
  },
};