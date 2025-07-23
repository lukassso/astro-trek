export type SiteConfig = {
  author: string;
  title: string;
  description: string;
  lang: string;
  ogLocale: string;
};

export type SiteMeta = {
  title: string;
  description?: string;
  ogImage?: string | undefined;
  articleDate?: string | undefined;
};

export type PaginationLink = {
  url: string;
  text?: string;
  srLabel?: string;
};

export interface PortfolioItem {
  title: string;
  description?: string;
  technologies?: string[];
  imageUrl?: string;
  path?: string;
}

export interface MenuSubLink {
  title: string;
  path?: string;
}

export interface MenuLink {
  title: string;
  path?: string;
  subLinks?: MenuSubLink[];
}

export interface Language {
  lang: "en" | "pl";
}
