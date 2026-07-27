# TODO.MD — Astro 전환 작업 체크리스트

> 상세 계획: [ASTRO_PLAN.md](ASTRO_PLAN.md)  
> 디자인 시스템: [DESIGN.md](DESIGN.md)  
> AI 협업 가이드: [CLAUDE.MD](CLAUDE.MD)  
> 마지막 업데이트: 2026-06-24

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
- [x] `npm install` — 292 packages (exit code 0)
- [x] `npm run build` — 1 page built in 4.30s (exit code 0, 오류 없음)
- [x] `npm run dev` — Astro v5.18.2, http://localhost:4321/ 가동 확인
- [ ] **브라우저에서 직접 확인**: http://localhost:4321/
  - 배경색 #faf9f5 (크림) 확인
  - Cormorant Garamond 헤드라인, Inter 본문 확인
  - 오리온 SVG 로고 렌더링 확인
  - 코랄 버튼 (#cc785c) 확인

---

## Phase 2 — 콘텐츠 마이그레이션 (Day 2)

### 2-1. Content Collection 설정
- [ ] `src/content/` 디렉토리 생성
- [ ] `src/content/config.ts` 작성 — 스키마 정의 (ASTRO_PLAN.md §6 참조)
- [ ] frontmatter 변환 PowerShell 스크립트 작성:
  - `last_modified_at` → `pubDate` rename
  - `layout: single`, `author_profile`, `toc_sticky`, `read_time`, `comments`, `share`, `related` 삭제

### 2-2. 포스트 이동
- [ ] `_posts/*.md` 60개 → `src/content/posts/` 복사 (파일명 유지)
- [ ] frontmatter 변환 스크립트 실행
- [ ] Jekyll Liquid 문법 포함 포스트 확인:
  ```powershell
  Select-String -Path "src/content/posts/*.md" -Pattern "{%"
  ```
  발견 시 수동 처리

### 2-3. Assets 이동
- [ ] `assets/images/` → `public/assets/images/` 전체 복사
- [ ] `assets/pdfs/` → `public/assets/pdfs/` 전체 복사
- [ ] `_pages/about.md` 내용 별도 저장 (Phase 5에서 사용)

### 2-4. Phase 2 검증
- [ ] `npm run build` — 포스트 60개 오류 없음
- [ ] 임시 `[slug].astro` 로 포스트 1개 접근 테스트

---

## Phase 3 — 네비게이션 + 히어로 + 피처카드 (Day 3)

### 3-1. Navigation
- [x] 오리온 별자리 SVG 로고 생성 (`public/assets/images/orion-logo.svg`) ← **완료**
- [ ] `src/components/Nav.astro` 작성
  - 배경: `$color-canvas` (#faf9f5), 높이 64px
  - 좌측: `<img src="/assets/images/orion-logo.svg">` (32px height) + "HouuYa's Blog" (Cormorant Garamond)
  - SVG `color: $color-ink` (#141413) → 크림 배경 위 어두운 별자리
  - 우측 링크: About · Posts · Search
  - 모바일 (< 768px): 햄버거 메뉴, 크림 풀스크린 드로어
- [ ] `src/styles/_nav.scss` 작성

### 3-2. Hero 밴드
- [ ] `src/components/CodeWindowCard.astro` 작성
  - 배경: `$color-surface-dark` (#181715)
  - JetBrains Mono 14px, `$color-on-dark` 텍스트
  - 블로그 주제 코드 mockup 내용 (타이핑 스타일)
  - border-radius: `$rounded-xl` (16px)
- [ ] `src/components/Hero.astro` 작성
  - 6/6 그리드 레이아웃 (desktop), 1컬럼 (mobile)
  - 좌측: h1 "규제의 언어로 쓰는 AI 이야기" (64px, Cormorant Garamond)
  - 좌측: 부제목 Inter 18px
  - 좌측: [최신 글 읽기 →] 코랄 버튼 + [About me] Secondary 버튼
  - 우측: `<CodeWindowCard />`
- [ ] `src/styles/_hero.scss` 작성

### 3-3. Feature Cards
- [ ] `src/components/FeatureCard.astro` 작성
  - 배경: `$color-surface-card` (#efe9de)
  - border-radius: `$rounded-lg` (12px), padding: `$spacing-xl` (32px)
  - 아이콘 영역 + 제목 (Inter 18px/500) + 설명 (Inter 16px/400) + 링크
- [ ] 4개 카드 콘텐츠 확정:
  - **EU AI Act**: "유럽 AI 규제 체계와 고위험 AI 분류, 인증 의무를 분석합니다."
  - **AI 거버넌스**: "AI 시스템의 책임·투명성·감사 체계를 실무 관점으로 기록합니다."
  - **기술 표준**: "국제 기술 표준, KC·CE 인증, 규제 간 정합성을 다룹니다."
  - **책**: "AI, 규제, 지식관리 분야의 독서 기록과 인사이트를 공유합니다."
- [ ] `src/styles/_cards.scss` 작성

### 3-4. CTA 밴드 + 홈 조립
- [ ] `src/components/CtaBand.astro` 작성
  - 배경: `$color-primary` (#cc785c), 텍스트: `$color-on-primary` (white)
  - border-radius: `$rounded-lg`, padding: 64px
  - 문구: "글 전체 보기 →" + Secondary 버튼 (크림)
- [ ] `src/components/PostCard.astro` 작성 (최근 포스트용)
  - 배경: 크림, hairline 보더 1px
  - 제목 + 날짜 + 카테고리 badge-pill + 설명 1줄
- [ ] `src/pages/index.astro` 조립:
  ```
  Nav → Hero → FeatureCards(4) → CtaBand → 최근 포스트 6개 → Footer
  ```
- [ ] `src/styles/_cards.scss`에 PostCard, CtaBand 스타일 추가

### 3-5. Phase 3 검증
- [ ] **스냅샷 1**: 홈 데스크탑 (1440px) — 크림 배경, 코랄 버튼, Cormorant Garamond 헤드라인
- [ ] 피처카드 4-up 레이아웃 확인
- [ ] 코랄 CTA 밴드 색상 (#cc785c) 확인

---

## Phase 4 — 포스트 레이아웃 + 아카이브 + 푸터 (Day 4)

### 4-1. PostLayout
- [ ] `src/layouts/PostLayout.astro` 작성
  - BaseLayout 상속
  - 포스트 제목: Cormorant Garamond display-lg (48px, -1px tracking)
  - 날짜, 카테고리, 태그: badge-pill (`$color-surface-card` 배경)
  - TOC: `toc: true` 시 우측 sticky (desktop)
  - 본문: Inter 16px, 행간 1.75
  - `word-break: keep-all` (한국어 단어 단위 줄바꿈 필수)
  - 코드블록: JetBrains Mono, `$color-surface-dark` 배경
- [ ] `src/styles/_post.scss` 작성 (한국어 가독성 포함)

### 4-2. 포스트 라우팅
- [ ] `src/pages/posts/index.astro` — 전체 포스트 목록 (날짜 역순)
- [ ] `src/pages/posts/[slug].astro` — 단일 포스트, PostLayout 적용
- [ ] `src/pages/categories/[category].astro` — 카테고리별 필터 목록
- [ ] `src/pages/tags/[tag].astro` — 태그별 필터 목록
  - 한글 카테고리/태그: `encodeURIComponent` 처리 확인

### 4-3. Footer
- [ ] `src/components/Footer.astro` 작성
  - 배경: `$color-surface-dark` (#181715)
  - 상단: 오리온 SVG (24px, `color: $color-on-dark`) + "HouuYa's Blog" ($color-on-dark)
  - 태그라인: "Connecting the constellation of data" ($color-on-dark-soft)
  - 4컬럼 링크: Posts · About · Categories · Tags
  - 하단: 저작권 ($color-on-dark-soft: #a09d96)
  - 패딩: 64px
- [ ] `src/styles/_footer.scss` 작성
- [ ] BaseLayout에 `<Footer />` 삽입

### 4-4. Phase 4 검증
- [ ] 포스트 3개 이상 클릭 → 본문 렌더링, 이미지, 코드블록 확인
- [ ] 한국어 `word-break: keep-all` 동작 확인
- [ ] 카테고리 아카이브 (예: `/categories/AI Regulation`) 접근 확인
- [ ] 푸터 렌더링 확인

---

## Phase 5 — About + 반응형 + Pagefind (Day 5)

### 5-1. About 페이지
- [ ] `src/pages/about.astro` 작성
  - `_pages/about.md` 내용 전체 이식
  - BaseLayout 적용, 크림 배경
  - 섹션별 Cormorant Garamond 헤드라인

### 5-2. 반응형 (DESIGN.md 브레이크포인트)
- [ ] `src/styles/_responsive.scss` 작성

  | 구간 | 적용 |
  |---|---|
  | `< 768px` | 햄버거 메뉴, hero 1컬럼, 카드 1-up, 푸터 1컬럼 |
  | `768–1024px` | 카드 2-up, nav 유지, 푸터 2컬럼 |
  | `> 1024px` | 카드 4-up (2+2), 전체 nav, 히어로 6/6 그리드 |
  | `> 1440px` | 콘텐츠 최대 너비 1200px 고정 |

- [ ] 버튼 최소 터치 타겟 40×40px 확인
- [ ] 코드블록 모바일 수평 스크롤 처리 (줄바꿈 금지)

### 5-3. Pagefind 검색
- [ ] `npm install @pagefind/default-ui` 설치
- [ ] `package.json` build 스크립트 수정:
  ```json
  "build": "astro build && npx pagefind --site dist"
  ```
- [ ] `src/pages/search.astro` 작성 (Pagefind UI 삽입)
- [ ] BaseLayout에 Pagefind CSS 조건부 로드

### 5-4. SEO & 리다이렉트
- [ ] BaseLayout Open Graph 메타태그: `og:title`, `og:description`, `og:url`
- [ ] `public/404.html` 작성 — Jekyll URL 패턴 → `/posts/slug/` JS 리다이렉트
- [ ] `robots.txt` 생성 (public/)
- [ ] sitemap 확인 (`@astrojs/sitemap` 통합)

### 5-5. Phase 5 검증
- [ ] **스냅샷 2**: 홈 모바일 (375px) — 1컬럼 스택, 햄버거 메뉴
- [ ] Pagefind 검색: "AI Act" / "제품안전" 한국어 검색 동작 확인
- [ ] About 페이지 렌더링 확인

---

## Phase 6 — GitHub Actions + 최종 QA (Day 6)

### 6-1. GitHub Actions 배포
- [ ] `.github/workflows/deploy.yml` 작성 (ASTRO_PLAN.md §9 코드 사용)
- [ ] GitHub Repository Settings → Pages → Source: **GitHub Actions** 변경
- [ ] `master` 브랜치에 push → Actions 탭 빌드 확인

### 6-2. 최종 빌드 QA
- [ ] `npm run build` 로컬 최종 — 오류/경고 없음
- [ ] `npm run preview` → 전체 페이지 점검
- [ ] `https://houuya.github.io` 라이브 URL 접속 확인
- [ ] 포스트 60개 중 샘플 10개 URL 접근 확인

### 6-3. 스크린샷 3장 제출
- [ ] 스냅샷 1: 홈 데스크탑 (1440px)
- [ ] 스냅샷 2: 홈 모바일 (375px)
- [ ] 스냅샷 3: 단일 포스트 (1440px)

### 6-4. 사후 정리
- [ ] Jekyll 레거시 파일 정리 방침 결정 (보존 권장, 별도 브랜치 이동)
- [ ] `ASTRO_PLAN.md` 상태 → "완료"로 갱신
- [ ] `CLAUDE.MD` 최종 업데이트 (Astro 구조 반영)
- [ ] `TODO.MD` 완료 항목 정리

---

## 진행 상태 요약

| Phase | 항목 수 | 완료 | 진행률 |
|---|---|---|---|
| 1. 초기화 + 토큰 + 폰트 | 12 | 0 | 0% |
| 2. 콘텐츠 마이그레이션 | 10 | 0 | 0% |
| 3. 네비 + 히어로 + 카드 | 16 | 0 | 0% |
| 4. 포스트 + 아카이브 + 푸터 | 13 | 0 | 0% |
| 5. About + 반응형 + Pagefind | 14 | 0 | 0% |
| 6. 배포 + QA | 11 | 0 | 0% |
| **총계** | **76** | **0** | **0%** |

---

*관련 문서: [ASTRO_PLAN.md](ASTRO_PLAN.md) · [DESIGN.md](DESIGN.md) · [CLAUDE.MD](CLAUDE.MD)*
