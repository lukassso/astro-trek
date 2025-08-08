import { getCollection, type CollectionEntry } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<'post'>[]> {
  return await getCollection("post", (entry: CollectionEntry<'post'>) => {
    return import.meta.env.PROD ? entry.data.draft !== true : true;
  });
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
    const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
    return bDate - aDate;
  });
}
