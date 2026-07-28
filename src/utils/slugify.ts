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
