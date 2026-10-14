import {
  SITE_URL,
  SITE_AUTHOR_NAME,
  SITE_BRAND_NAME,
  GITHUB_URL,
  LINKEDIN_URL,
  DEFAULT_OG_IMAGE_URL,
} from "@/config/seo";
import type { CollectionEntry } from "astro:content";
import { portfolioItems } from "@/site.config";

/**
 * Common author representation adhering to E-E-A-T guidelines for AEO/GEO engines.
 */
export function generatePersonSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#author`,
    name: SITE_AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: "Senior Full-Stack & AI Engineer",
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

/**
 * Top-level WebSite schema with publisher relationship.
 */
export function generateWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_BRAND_NAME,
    alternateName: ["AI Greener", "Astro Trek"],
    description: "Where lightweight AI experiments grow. Web engineering lab and portfolio.",
    inLanguage: ["en-US", "pl-PL"],
    publisher: {
      "@id": `${SITE_URL}/#author`,
    },
  };
}

/**
 * BreadcrumbList schema for structural taxonomy recognition.
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * TechArticle / BlogPosting schema for blog posts.
 */
export function generateBlogPostSchema(
  post: CollectionEntry<"post">,
  canonicalUrl?: string,
) {
  const postUrl = canonicalUrl || `${SITE_URL}/blog/${post.slug.replace(/^(en|pl)\//, "")}`;
  const heroImageUrl = post.data.heroImage
    ? new URL(post.data.heroImage, SITE_URL).href
    : DEFAULT_OG_IMAGE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${postUrl}#article`,
    headline: post.data.title,
    description: post.data.description,
    url: postUrl,
    datePublished: post.data.publishDate.toISOString(),
    dateModified: (post.data.updatedDate || post.data.publishDate).toISOString(),
    inLanguage: post.data.lang || "en",
    image: heroImageUrl,
    keywords: post.data.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: generatePersonSchema(),
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
  };
}

/**
 * WebApplication schema for interactive micro-applications and islands.
 */
export interface SoftwareAppOptions {
  title: string;
  description: string;
  path: string;
  applicationCategory?: string;
  technologies?: string[];
  browserRequirements?: string;
}

export function generateSoftwareAppSchema(options: SoftwareAppOptions) {
  const appUrl = options.path.startsWith("http")
    ? options.path
    : `${SITE_URL}${options.path.startsWith("/") ? options.path : `/${options.path}`}`;

  return {
    "@type": "WebApplication",
    "@id": `${appUrl}#app`,
    name: options.title,
    url: appUrl,
    description: options.description,
    applicationCategory: options.applicationCategory || "DeveloperApplication",
    operatingSystem: "All modern web browsers (Chrome, Firefox, Safari, Edge)",
    browserRequirements:
      options.browserRequirements || "Requires modern JavaScript and HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: generatePersonSchema(),
    creator: {
      "@id": `${SITE_URL}/#author`,
    },
    featureList: options.technologies?.join(", "),
  };
}

/**
 * Pre-configured schema generator for an experiment page by slug.
 */
export function generateExperimentJsonLd(slug: string, title?: string, description?: string) {
  const matchingItem = portfolioItems.find(
    (item) => item.path && (item.path === `/${slug}` || item.path.endsWith(`/${slug}`)),
  );

  const appTitle = title || matchingItem?.title || slug;
  const appDescription =
    description ||
    matchingItem?.description ||
    `Interactive web application: ${appTitle}`;
  const appPath = matchingItem?.path || `/${slug}`;
  const technologies = matchingItem?.technologies || [];

  let applicationCategory = "DeveloperApplication";
  let browserRequirements = "Requires modern JavaScript support";

  if (slug.includes("webcam") || slug.includes("detection")) {
    applicationCategory = "MultimediaApplication";
    browserRequirements = "Requires WebGL hardware acceleration and webcam permission";
  } else if (slug.includes("ai") || slug.includes("rag")) {
    applicationCategory = "BusinessApplication";
  } else if (slug.includes("currency") || slug.includes("transactions") || slug.includes("bank")) {
    applicationCategory = "FinanceApplication";
  } else if (slug.includes("movie")) {
    applicationCategory = "EntertainmentApplication";
  } else if (slug.includes("three")) {
    applicationCategory = "DesignApplication";
    browserRequirements = "Requires WebGL 3D hardware acceleration";
  }

  const appSchema = generateSoftwareAppSchema({
    title: appTitle,
    description: appDescription,
    path: appPath,
    applicationCategory,
    technologies,
    browserRequirements,
  });

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "App Suite", url: "/#portfolio" },
    { name: appTitle, url: appPath },
  ]);

  return {
    "@context": "https://schema.org",
    "@graph": [appSchema, breadcrumbs],
  };
}

/**
 * Home page JSON-LD graph (WebSite + Person entity).
 */
export function generateHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [generateWebSiteSchema(), generatePersonSchema()],
  };
}
