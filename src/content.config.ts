import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // i18n & taxonomy
    lang: z.enum(["en", "zh"]).default("en"),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    author: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "**/*.{md,mdx,json}" }),
  schema: z.object({
    id: z.string().optional(),
    name: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const achievements = defineCollection({
  loader: glob({ base: "./src/content/achievements", pattern: "**/*.{md,json}" }),
  schema: z.object({
    type: z.enum(["competition", "publication", "award"]),
    title: z.string(),
    project: z.string().optional(),
    prize: z.string(),
    date: z.coerce.date(),
    certificate: z.string().optional(), // 證明文件路徑
    photo: z.string().optional(), // 活動照片路徑
    lang: z.enum(["en", "zh"]).default("en"),
  }),
});

export const collections = { blog, authors, achievements };
