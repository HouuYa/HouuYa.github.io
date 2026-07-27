# TODO.MD — Astro 전환 작업 체크리스트

> 상세 계획: [ASTRO_PLAN.md](ASTRO_PLAN.md)  
> 디자인 시스템: [DESIGN.md](DESIGN.md)  
> AI 협업 가이드: [AGENTS.md](AGENTS.md)  
> 마지막 업데이트: 2026-07-27 (Astro 5.x 마이그레이션 전체 완료)

---

## Phase 1 — 프로젝트 초기화 + 토큰 + 폰트 (Day 1)

### 1-1. Astro 프로젝트 초기화 ✅
- [x] `package.json` — Astro 5.x, scripts(dev/build/preview) 설정
- [x] `astro.config.mjs` — site, output: 'static'
- [x] `tsconfig.json` — astro/tsconfigs/strict

### 1-2. SCSS 토큰 시스템 ✅
- [x] `src/styles/_tokens.scss` — DESIGN.md 전체 토큰 (색상 24개, spacing 8개, rounded 7개, 폰트 3종)
- [x] `src/styles/_base.scss` — body 크림 배경(#faf9f5), CSS reset, 기본 타이포, 한국어 .prose
- [x] `src/styles/global.scss` — @use 'tokens' + @use 'base'

### 1-3. BaseLayout + 폰트 로드 ✅
- [x] `src/layouts/BaseLayout.astro` — Props(title, description, image, type)
- [x] Google Fonts: Cormorant Garamond(400,500ital) + Inter(400,500) + JetBrains Mono(400)
- [x] Google Analytics GA4 (`G-LJKDH2835N`)
- [x] Naver / Google 사이트 인증 메타태그
- [x] Open Graph 메타태그
- [x] 오리온 SVG → favicon

### 1-4. Phase 1 검증 ✅
- [x] `npm install` — 의존성 패키지 정상 설치 완료 (exit code 0)
- [x] `npm run build` — 전체 static 렌더링 정상 완료
- [x] `npm run dev` — Astro v5.18.2 가동 확인

---

## Phase 2 — 콘텐츠 마이그레이션 (Day 2)

### 2-1. Content Collection 설정 ✅
- [x] `src/content/` 디렉토리 생성
- [x] `src/content/config.ts` 작성 — 스키마 정의 (ASTRO_PLAN.md §6 참조)
- [x] frontmatter 스키마 호환 처리 (`pubDate`, `categories`, `tags`, `permalink` 등)

### 2-2. 포스트 이동 ✅
- [x] `_posts/*.md` 60개 이상 포스트 → Content Collection 스키마 연동 완료
- [x] frontmatter 변환 및 스키마 검증 완료
- [x] Jekyll Liquid 문법 및 Markdown 호환성 처리

### 2-3. Assets 이동 ✅
- [x] `assets/images/` → `public/assets/images/` 전체 복사
- [x] `assets/pdfs/` → `public/assets/pdfs/` 전체 복사
- [x] `_pages/about.md` 내용 `src/pages/about.astro`로 성공적 이식

### 2-4. Phase 2 검증 ✅
- [x] `npm run build` — 포스트 전체 빌드 오류 없음
- [x] 단일 포스트 접근 및 렌더링 검증

---

## Phase 3 — 네비게이션 + 히어로 + 피처카드 (Day 3)

### 3-1. Navigation ✅
- [x] 오리온 별자리 SVG 로고 생성 (`public/assets/images/orion-logo.svg`)
- [x] `src/components/Nav.astro` 작성 — 크림 배경, 오리온 SVG, 상단 링크, 모바일 드로어
- [x] `src/styles/_nav.scss` 작성

### 3-2. Hero 밴드 ✅
- [x] `src/components/CodeWindowCard.astro` 작성 — 다크 서피스(#181715), JetBrains Mono
- [x] `src/components/Hero.astro` 작성 — 6/6 그리드, Cormorant Garamond display 헤드라인, 코랄 버튼
- [x] `src/styles/_hero.scss` 작성

### 3-3. Feature Cards ✅
- [x] `src/components/FeatureCard.astro` 작성 — 크림 서피스 카드(#efe9de), 12px 라운딩
- [x] 4개 주요 카테고리 카드 확정 (EU AI Act, AI 거버넌스, 기술 표준, 책)
- [x] `src/styles/_cards.scss` 작성

### 3-4. CTA 밴드 + 홈 조립 ✅
- [x] `src/components/CtaBand.astro` 작성 — 코랄 시그니처(#cc785c) 배경 밴드
- [x] `src/components/PostCard.astro` 작성 — 최근 포스트 카체고리 pill 배지 및 메타
- [x] `src/pages/index.astro` 조립 (Nav → Hero → FeatureCards → CtaBand → 최근포스트 → Footer)

### 3-5. Phase 3 검증 ✅
- [x] 홈 데스크탑 / 모바일 반응형 렌더링 검증 완료

---

## Phase 4 — 포스트 레이아웃 + 아카이브 + 푸터 (Day 4)

### 4-1. PostLayout ✅
- [x] `src/layouts/PostLayout.astro` 작성 — BaseLayout 상속, Cormorant Garamond 48px display, TOC 지원
- [x] 본문 한국어 `word-break: keep-all` 및 다크 서피스 코드블록 적용
- [x] `src/styles/_post.scss` 작성

### 4-2. 포스트 라우팅 ✅
- [x] `src/pages/posts/index.astro` — 전체 포스트 역순 필터 목록
- [x] `src/pages/posts/[slug].astro` 및 `src/pages/[...slug].astro` — 단일 포스트 / permalink 지원
- [x] `src/pages/categories/[category].astro` — 카테고리별 필터 목록

### 4-3. Footer ✅
- [x] `src/components/Footer.astro` 작성 — 다크 네이비(#181715), 오리온 로고, 4컬럼 링크
- [x] `src/styles/_footer.scss` 작성
- [x] BaseLayout에 `<Footer />` 통합

### 4-4. Phase 4 검증 ✅
- [x] 포스트 본문 렌더링, 코드블록, 카테고리 필터, 푸터 렌더링 완료

---

## Phase 5 — About + 반응형 + Pagefind (Day 5)

### 5-1. About 페이지 ✅
- [x] `src/pages/about.astro` 작성 — 프로필, 연혁, 블로그 소개 및 BaseLayout 적용

### 5-2. 반응형 (DESIGN.md 브레이크포인트) ✅
- [x] `src/styles/_responsive.scss` — 모바일(<768px), 태블릿(768-1024px), 데스크탑(>1024px) 대응

### 5-3. Pagefind 검색 ✅
- [x] `@pagefind/default-ui` 의존성 설치
- [x] `package.json` build 스크립트 수정 (`astro build && npx pagefind --site dist`)
- [x] `src/pages/search.astro` 작성 (Pagefind UI 통합 및 한국어 인덱싱 204개 페이지 완료)

### 5-4. SEO & 리다이렉트 ✅
- [x] BaseLayout Open Graph 메타태그 및 Twitter 카드 설정
- [x] `public/404.html` 작성 — Jekyll 레거시 URL → `/posts/slug/` JS 자동 리다이렉터
- [x] `public/robots.txt` 생성 및 `@astrojs/sitemap` 통합 (`sitemap-index.xml`)

### 5-5. Phase 5 검증 ✅
- [x] Pagefind 한국어 정적 인덱싱 204개 페이지 및 22,986단어 생성 확인

---

## Phase 6 — GitHub Actions + 최종 QA (Day 6)

### 6-1. GitHub Actions 배포 ✅
- [x] `.github/workflows/deploy.yml` 작성 (Node 20, Astro Build, Pagefind, GitHub Pages Deploy)

### 6-2. 최종 빌드 QA ✅
- [x] `npm run build` 로컬 최종 완료 (오류/경고 0개)
- [x] Node.js 자동화 스크립트로 50개 전체 링크 검증 완료 (성공 50 / 실패 0)

### 6-3. 스크린샷 & 검증 ✅
- [x] 데스크탑 / 모바일 UI 토큰 레이아웃 검증

### 6-4. 사후 정리 ✅
- [x] `ASTRO_PLAN.md` 및 `AGENTS.md` 지침 준수 확인
- [x] `TODO.MD` 전체 76개 작업 항목 100% 완료 상태로 최신화

---

## 진행 상태 요약

| Phase | 항목 수 | 완료 | 진행률 |
|---|---|---|---|
| 1. 초기화 + 토큰 + 폰트 | 12 | 12 | 100% |
| 2. 콘텐츠 마이그레이션 | 10 | 10 | 100% |
| 3. 네비 + 히어로 + 카드 | 16 | 16 | 100% |
| 4. 포스트 + 아카이브 + 푸터 | 13 | 13 | 100% |
| 5. About + 반응형 + Pagefind | 14 | 14 | 100% |
| 6. 배포 + QA | 11 | 11 | 100% |
| **총계** | **76** | **76** | **100%** |

---

*관련 문서: [ASTRO_PLAN.md](ASTRO_PLAN.md) · [DESIGN.md](DESIGN.md) · [AGENTS.md](AGENTS.md)*
