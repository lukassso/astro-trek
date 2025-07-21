import type { Props as SeoConfig } from "@astrolib/seo";

export const SITE_URL = "https://aigreener.com";
const SITE_TITLE = "Custom Web Apps & AI Product Development";
export const SITE_AUTHOR_NAME = "Lukasz Zatyka";
export const SITE_BRAND_NAME = "AIGreener";
const SITE_DESCRIPTION =
  "I help businesses build & scale ambitious digital products. Specializing in Next.js web apps and rapid AI prototyping. Let's discuss your project.";
export const GITHUB_URL = "https://github.com/lukassso";
export const LINKEDIN_URL = "https://www.linkedin.com/in/lukasz-zatyka/";
export const DEFAULT_OG_IMAGE_URL = new URL("/og-image.png", SITE_URL).href;
const LOGO_URL = new URL("/logo.png", SITE_URL).href;

export const seoConfig: SeoConfig = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  titleTemplate: `%s | ${SITE_BRAND_NAME}`,

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_TITLE} | ${SITE_BRAND_NAME}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_BRAND_NAME}`,
      },
    ],
    site_name: SITE_BRAND_NAME,
  },

  twitter: {
    cardType: "summary_large_image",
  },
};
