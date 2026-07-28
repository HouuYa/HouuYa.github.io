// 카테고리/태그 문자열 → URL 슬러그
// Astro Content Layer의 glob loader가 파일명에 적용하는 규칙(소문자화, 쉼표/괄호 제거,
// 공백→하이픈)과 동일한 패턴을 문자열 값에도 적용해 posts와 동일한 URL 스타일을 유지한다.
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[(),]/g, '')
    .replace(/\s+/g, '-');
}

// 서로 다른 categories frontmatter 값을 같은 카테고리 페이지로 합치기 위한 별칭 매핑.
// key: slugify() 결과, value: 병합될 대표 슬러그/표시 이름.
// 예: "Standardization" 태그를 단 글도 기존 "NLF" 카테고리 페이지(기술 표준 topic)에 합류시킨다.
const CATEGORY_ALIASES: Record<string, { slug: string; name: string }> = {
  standardization: { slug: 'nlf', name: 'NLF' },
};

// categories frontmatter 값 하나를 실제로 그룹핑할 슬러그/표시 이름으로 변환.
// 카테고리 목록 페이지(categories/index.astro)와 개별 카테고리 페이지([category].astro)가
// 동일한 그룹핑 결과를 갖도록 이 함수를 공통으로 사용한다.
export function resolveCategory(cat: string): { slug: string; name: string } {
  const rawSlug = slugify(cat);
  return CATEGORY_ALIASES[rawSlug] ?? { slug: rawSlug, name: cat };
}
