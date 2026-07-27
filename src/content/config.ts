import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),

    // YAML 빈 값은 null로 파싱 → nullish() = nullable + optional
    description: z.string().nullish(),

    // 배열 안에도 빈 항목(null)이 포함될 수 있으므로 transform으로 필터
    categories: z.array(z.string().nullable()).nullish()
      .transform(arr => (arr ?? []).filter((v): v is string => v != null)),
    tags: z.array(z.string().nullable()).nullish()
      .transform(arr => (arr ?? []).filter((v): v is string => v != null)),

    // YAML이 유효한 날짜 → Date 객체, 잘못된 형식 → string 으로 파싱
    pubDate: z.union([z.date(), z.string()]).nullish(),
    last_modified_at: z.union([z.date(), z.string()]).nullish(),

    toc: z.boolean().nullish(),

    // Jekyll 전용 필드 — Astro에서는 무시되지만 파일에 남아 있어도 오류 없음
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
