import type { SeoConfig } from "@astrolib/seo";

const SITE_URL = "https://aigreener.com";
const SITE_TITLE = "Custom Web Apps & AI Product Development | AIGreener";
const SITE_AUTHOR = "Lukasz Zatyka";
const SITE_COMPANY = "AIGreener";
const SITE_DESCRIPTION = "I help businesses build & scale ambitious digital products. Specializing in Next.js web apps and rapid AI prototyping. Let's discuss your project.";
// const SOCIAL_HANDLE = "@twoj_uchwyt_twitter";
const GITHUB_URL = "https://github.com/lukassso";
const LINKEDIN_URL = "https://www.linkedin.com/in/lukasz-zatyka/";

export const seoConfig: SeoConfig = {
  charSet: "UTF-8",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  lang: "en-GB",
  titleTemplate: "%s | AIGreener",
  author: SITE_AUTHOR,
  company: SITE_COMPANY,

  // --- Open Graph (Facebook, LinkedIn, etc.) ---
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    image: {
      url: new URL("/og-image.png", SITE_URL).href,
      width: 1200,
      height: 630,
      alt: "AIGreener - Custom Web App and AI Product Development"
    },
    siteName: SITE_COMPANY,
  },
  
  // --- Twitter (X) Cards ---
  twitter: {
    card: "summary_large_image",
    // handle: SOCIAL_HANDLE,
    // site: SOCIAL_HANDLE,
  },
  
  // --- JSON-LD (Dane Strukturalne) ---
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": SITE_COMPANY,
      "description": "Specialist in custom web application development, AI prototyping, and data processing using modern stacks like Next.js.",
      "url": SITE_URL,
      "logo": new URL("/logo.png", SITE_URL).href,
      "provider": {
        "@type": "Person",
        "name": SITE_AUTHOR,
        "url": SITE_URL,
      },
      "sameAs": [
        GITHUB_URL,
        LINKEDIN_URL
      ]
    }
  ]
};