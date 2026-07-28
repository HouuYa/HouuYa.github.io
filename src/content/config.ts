import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './_posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullish(),

    categories: z.array(z.string().nullable()).nullish()
      .transform(arr => (arr ?? []).filter((v): v is string => v != null)),
    tags: z.array(z.string().nullable()).nullish()
      .transform(arr => (arr ?? []).filter((v): v is string => v != null)),

    pubDate: z.union([z.date(), z.string()]).nullish(),
    last_modified_at: z.union([z.date(), z.string()]).nullish(),

    toc: z.boolean().nullish(),

    // Astro/Markdown 전용 지원 필드
    slug: z.string().nullish(),
    permalink: z.string().nullish(),

    // Jekyll 호환 필드
    layout: z.string().nullish(),
    author_profile: z.boolean().nullish(),
    toc_sticky: z.boolean().nullish(),
    read_time: z.boolean().nullish(),
    comments: z.boolean().nullish(),
    share: z.boolean().nullish(),
    related: z.boolean().nullish(),
    hidden: z.boolean().nullish(),
    excerpt: z.string().nullish(),
    header: z.any().nullish(),
    excerpt_separator: z.string().nullish(),
  }),
});

export const collections = { posts };
