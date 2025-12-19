import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const post = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string().max(60),
      description: z.string().min(50).max(160),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      ogImage: z.string().optional(),
      heroImage: z.string().optional(),
      coverImage: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      lang: z.string().default("en"),
      translations: z.record(z.string()).default({}),
    }),
});

const note = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      publishDate: z.coerce.date(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      likes: z.number().default(0),
      authorName: z.string().default("Lukasz Zatyka"),
      authorHandle: z.string().default(""),
      lang: z.string().default("en"),
      draft: z.boolean().default(false),
    }),
});

export const collections = { post: post, note: note };
