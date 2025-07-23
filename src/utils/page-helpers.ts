import { getCollection, type CollectionEntry } from "astro:content";
import type { PaginateFunction } from "astro";
import type { Language } from "@/types";

export async function getAllPosts(lang: Language["lang"]): Promise<CollectionEntry<"post">[]> {
  return await getCollection("post", (entry: CollectionEntry<"post">) => {
    const languageMatch = lang ? entry.id.startsWith(`${lang}/`) : true;
    const draftStatusMatch = import.meta.env.PROD ? entry.data.draft !== true : true;
    return languageMatch && draftStatusMatch;
  });
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
    const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
    return bDate - aDate;
  });
}

export type PostWithUrl = CollectionEntry<"post"> & { url: string };

interface GetBlogStaticPathsParams {
  lang: Language["lang"];
  paginate: PaginateFunction;
}

/**
 * Generates static paths for blog posts, ensuring correct URLs based on the language.
 *
 * @param {GetBlogStaticPathsParams} params - Parameters including language and pagination function.
 * @returns {Promise<ReturnType<PaginateFunction>>} - Returns paginated blog posts with correct URLs.
 */
export async function getBlogStaticPaths({ lang, paginate }: GetBlogStaticPathsParams) {
  //  We first fetch all posts, then sort them by date, and finally create URLs based on the language.
  const allPosts = await getAllPosts(lang);
  const allPostsByDate = sortMDByDate(allPosts);

  // 2. Map posts to include URLs based on the language
  const postsWithUrls: PostWithUrl[] = allPostsByDate.map((post) => {
    //  We remove the language prefix from the slug to create a clean URL.
    const cleanSlug = post.slug.replace(/^(en|pl)\//, "");

    //  We create a URL prefix only for languages other than the default
    const urlPrefix = lang === "pl" ? "/pl" : "";

    return {
      ...post,
      url: `${urlPrefix}/blog/${cleanSlug}`,
    };
  });

  return paginate(postsWithUrls, { pageSize: 8 });
}
