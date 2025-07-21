import type { Props as SeoProps } from "@astrolib/seo";
import { SITE_URL, SITE_BRAND_NAME, DEFAULT_OG_IMAGE_URL } from "./seo";

interface PageData {
  title: string;
  description: string;
  og?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    alt?: string;
  };
}

const pagesData: Record<string, PageData> = {
  "index": {
    title: "Custom Web Apps & AI Product Development",
    description: "I help businesses build & scale ambitious digital products. Specializing in Next.js web apps and rapid AI prototyping. Let's discuss your project.",
    og: {
      imageUrl: "/assets/images/blog-posts.webp",
      title: "Check out the portfolio of AIGreener",
      description: "Explore my portfolio of custom web apps and AI projects. From full JS applications to AI prototypes, see how I can help your business grow.",
      alt: "AIGreener Portfolio"
    }
  },
  "blog": {
    title: "Writes on Web Development and AI",
    description: "Web development insights, programming tutorials, and experiments with AI. Explore articles on modern web technologies.",
    og: {
      title: "Writing about web development and AI",
      description: "Web development insights, programming tutorials, and experiments with AI. Explore articles on modern web technologies.",
      imageUrl: "/assets/images/post_img.webp",
      alt: "AIGreener Blog"
    }
  },

  // === Dashboardy / App Suite ===
  "bank-transactions": {
    title: "Bank Transactions Dashboard Demo",
    description: "An interactive dashboard to view, add, and search bank transactions. A live demo showcasing React, TypeScript, and modern state management.",
    og: {
      imageUrl: "/assets/images/portfolio-bank-transactions.png" 
    }
  },
  "playground-ai": {
    title: "AI Playground with ChatGPT API",
    description: "Experiment with OpenAI's ChatGPT through a user-friendly interface. Adjust model settings and see interactive AI responses in real-time.",
    og: {
      imageUrl: "/assets/images/portfolio-playground-ai.png"
    }
  },
  "firebase-auth": {
    title: "Firebase Authentication Flow Demo",
    description: "A complete sign-in, sign-up, and password reset flow built with Firebase Authentication. A practical example for modern web apps.",
    og: {
      imageUrl: "/assets/images/portfolio-firebase-auth.png"
    }
  },
  "framer-parallax": {
    title: "Framer Motion Parallax Scroll Effect",
    description: "See a beautiful and smooth parallax scrolling effect in action. A demonstration of the Framer Motion animation library in a React/Astro project.",
    og: {
      imageUrl: "/assets/images/portfolio-framer-parallax.png"
    }
  },
  "hacker-news": {
    title: "Minimalist Hacker News Client",
    description: "A fast and clean client for browsing Hacker News. A practical example of fetching and displaying data from a REST API.",
    og: {
      imageUrl: "/assets/images/portfolio-hacker-news.png"
    }
  },
  "movie-app": {
    title: "Movie Discovery App (TMDB API)",
    description: "Browse, search, and discover movies using the TMDB API. A feature-rich demo showcasing React Query, routing, and complex state management.",
    og: {
      imageUrl: "/assets/images/portfolio-movie-app.png"
    }
  },
  "multi-select": {
    title: "Advanced Multi-Select React Component",
    description: "An accessible, reusable, and powerful multi-select component for React, built with Radix UI and Tailwind CSS.",
    og: {
      imageUrl: "/assets/images/portfolio-multi-select.png"
    }
  },
  "nbp-currency-explorer": {
    title: "NBP Currency Rate Explorer",
    description: "Analyze and visualize historical currency exchange rates from the National Bank of Poland (NBP) API with interactive charts.",
    og: {
      imageUrl: "/assets/images/portfolio-nbp-currency-explorer.png"
    }
  },
  "rag-assistant": {
    title: "RAG AI Assistant Demo",
    description: "A proof-of-concept AI assistant using the RAG (Retrieval-Augmented Generation) pattern to answer questions from a custom knowledge base.",
  },
  "random-person": {
    title: "Random Person Profile Generator",
    description: "A simple but useful tool for developers and testers to generate random user profiles for testing purposes.",
    og: {
      imageUrl: "/assets/images/portfolio-random-person.png"
    }
  },
  "svg-anime-universe": {
    title: "Advanced SVG Animation Showcase",
    description: "An example of complex and performant SVG animations used to create a dynamic and engaging user interface.",
    og: {
      imageUrl: "/assets/images/portfolio-svg-anime.png"
    }
  },
  "task-manager": {
    title: "Task Manager App Demo",
    description: "A classic task manager to demonstrate state management with Redux or Context API.",
    og: {
      imageUrl: "/assets/images/portfolio-task-manager.png"
    }
  },
  "url-scraper": {
    title: "Simple Web Scraper Tool",
    description: "A demonstration of a web scraper application that can extract data, like titles and meta tags, from a given URL.",
  },
  "webcam-object-detection": {
    title: "Real-Time Object Detection in Browser",
    description: "Using your webcam, this app performs real-time object detection directly in the browser with TensorFlow.js.",
  },
  "webcam-pose-detection": {
    title: "Real-Time Pose Detection in Browser",
    description: "A web app using TensorFlow.js to perform real-time human pose detection and estimation in the browser.",
    og: {
      imageUrl: "/assets/images/portfolio-webcam-pose-detection.png"
    }
  },
};

function generatePageSeo(slug: string): SeoProps {
  const pageData = pagesData[slug];
  if (!pageData) {
    throw new Error(`SEO configuration for slug "${slug}" not found in pages.ts`);
  }

  const title = pageData.og?.title || `${pageData.title}`;
  const ogDescription = pageData.og?.description || pageData.description;
  const ogImageUrl = pageData.og?.imageUrl ? new URL(pageData.og.imageUrl, SITE_URL).href : DEFAULT_OG_IMAGE_URL;
  const ogAlt = pageData.og?.alt || `${pageData.title}`;
  const pageUrl = slug === 'index' ? SITE_URL : new URL(slug, SITE_URL).href;

  return {
    title: pageData.title,
    description: pageData.description,
    
    openGraph: {
      type: "website",
      url: pageUrl,
      title: title,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
      site_name: SITE_BRAND_NAME,
    },
  };
}

export const pagesSeo: Record<string, SeoProps> = Object.fromEntries(
  Object.keys(pagesData).map(slug => [slug, generatePageSeo(slug)])
);