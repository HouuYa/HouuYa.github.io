# Astro 전환 실행 계획 — HouuYa's Blog

> 확정일: 2026-06-24  
> 작성: Seungho Bae + Claude Code  
> 상태: **실행 대기 중**  
> 관련 문서: [DESIGN.md](DESIGN.md) · [TODO.MD](TODO.MD) · [CLAUDE.MD](CLAUDE.MD)

---

## 1. 전환 목적

Jekyll + Minimal Mistakes 기반 블로그를 **Astro 5.x** 로 전환한다.

| 이유 | 내용 |
|---|---|
| 디자인 자유도 | Jekyll/MM 테마 오버라이드 한계 — DESIGN.md 100% 구현 불가 |
| 성능 | Jekyll Ruby 빌드 대비 5~10× 빠름 |
| 구조 | `.md` 파일 직접 지원, 완전한 컴포넌트 아키텍처 |
| 배포 | GitHub Actions → GitHub Pages 정적 배포 (기존 URL 유지) |

**유지하는 것:**
- `_posts/*.md` 60개 파일 (frontmatter 거의 호환)
- `assets/images/`, `assets/pdfs/` 자산
- GitHub Pages 배포 (houuya.github.io)
- Google Analytics GA4 (`G-LJKDH2835N`)
- Naver/Google 사이트 인증 메타태그

---

## 2. 확정된 결정사항

| 항목 | 결정 |
|---|---|
| 히어로 헤드라인 | **"규제의 언어로 쓰는 AI 이야기"** |
| 히어로 부제목 | "AI 거버넌스, 제품 안전, EU·한국 기술 규제의 실무 관점을 기록합니다." |
| 피처카드 4개 주제 | **EU AI Act · AI 거버넌스 · 기술 표준 · 책** |
| 검색 | **Pagefind** (정적 빌드 후 인덱스 생성, 한국어 지원) |
| SEO URL | 기존 Jekyll permalink → Astro 동일 경로 우선, 404 JS 리다이렉트 fallback |
| 디스플레이 폰트 | **Cormorant Garamond** 400/500 (Copernicus 라이선스 대체) |
| 본문/UI 폰트 | **Inter** 400/500 (StyreneB 라이선스 대체) |
| 코드 폰트 | **JetBrains Mono** 400 |
| 브랜드 마크 | **오리온 별자리 SVG** (`public/assets/images/orion-logo.svg`) |
| 태그라인 (영문) | **"Connecting the constellation of data"** |
| 태그라인 (한국어) | **"데이터의 별자리를 잇다"** |
| 배포 방식 | GitHub Actions (`withastro/action@v3`) → GitHub Pages 정적 |
| 스킨 | 별도 스킨 없음 — SCSS 토큰으로 직접 구현 |

---

## 3. 디자인 시스템 요약

원본: [DESIGN.md](DESIGN.md)

### 오리온 로고 색상 매핑

오리온 별자리 로고는 DESIGN.md 액센트 토큰과 정확히 대응한다.

| 별 | 천문 이름 | 색상 | DESIGN.md 토큰 |
|---|---|---|---|
| 좌측 상단 (큰 별) | Betelgeuse (베텔게우스) | 앰버 `#e8a55a` | `$color-accent-amber` |
| 우측 하단 (큰 별) | Rigel (리겔) | 틸 `#5db8a6` | `$color-accent-teal` |
| 나머지 6개 별 | 기타 | `currentColor` | `$color-on-dark` / `$color-ink` |
| 연결선 | — | `currentColor` | 배경 맥락에 따라 CSS 상속 |

**SVG 위치:** `public/assets/images/orion-logo.svg`  
**사용법:** 부모 요소의 CSS `color` 속성으로 별/선 색상 제어.  
- 크림 배경 (Nav): `color: #141413` → 어두운 별자리  
- 다크 배경 (Footer/Hero): `color: #faf9f5` → 밝은 별자리

### 핵심 색상 토큰

| SCSS 변수 | 값 | 용도 |
|---|---|---|
| `$color-canvas` | `#faf9f5` | 기본 페이지 배경 (크림) |
| `$color-primary` | `#cc785c` | 코랄 CTA, 버튼, 강조 |
| `$color-primary-active` | `#a9583e` | 버튼 호버/프레스 |
| `$color-surface-card` | `#efe9de` | 피처카드 배경 |
| `$color-surface-dark` | `#181715` | 코드 윈도우, 푸터, 다크 밴드 |
| `$color-surface-dark-elevated` | `#252320` | 다크 서피스 내 상위 요소 |
| `$color-ink` | `#141413` | 기본 헤드라인 텍스트 |
| `$color-body` | `#3d3d3a` | 본문 텍스트 |
| `$color-muted` | `#6c6a64` | 보조 텍스트, 캡션 |
| `$color-on-dark` | `#faf9f5` | 다크 서피스 위 텍스트 |
| `$color-on-dark-soft` | `#a09d96` | 다크 서피스 보조 텍스트 |
| `$color-hairline` | `#e6dfd8` | 카드/인풋 1px 테두리 |

### 서피스 3단계 페이징 리듬

```
크림 캔버스 (#faf9f5)   → 일반 섹션, 네비, 히어로
크림 카드  (#efe9de)    → 피처카드
다크 네이비 (#181715)   → 코드 윈도우, CTA, 푸터
```

**규칙**: 동일 서피스 2개를 연속 배치하지 않는다.

### 폰트 계층 규칙

| 역할 | 폰트 | 굵기 | letter-spacing |
|---|---|---|---|
| h1 (display-xl) | Cormorant Garamond | 400 | -1.5px (필수) |
| h2 (display-lg) | Cormorant Garamond | 400 | -1px |
| h3 (display-md) | Cormorant Garamond | 400 | -0.5px |
| 본문 | Inter | 400 | 0 |
| UI 레이블/버튼 | Inter | 500 | 0 |
| 코드 | JetBrains Mono | 400 | 0 |

**주의**: 세리프 헤드라인에 bold(700) 금지. 400 + 음수 자간이 브랜드 서명.

### 간격/라운드 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `$spacing-section` | 96px | 섹션 간 수직 패딩 |
| `$spacing-xl` | 32px | 카드 내부 패딩 |
| `$spacing-lg` | 24px | 코드 윈도우 패딩 |
| `$rounded-md` | 8px | 버튼, 인풋 |
| `$rounded-lg` | 12px | 컨텐츠 카드 |
| `$rounded-xl` | 16px | 히어로 일러스트 컨테이너 |
| `$rounded-pill` | 9999px | 배지 |

---

## 4. 완성 목표 디렉토리 구조

```
HouuYa.github.io/
├── src/
│   ├── content/
│   │   ├── config.ts                 ← Content Collection 스키마
│   │   └── posts/                    ← _posts/*.md → 이동
│   ├── layouts/
│   │   ├── BaseLayout.astro          ← <head>, Nav, Footer, GA4 포함
│   │   └── PostLayout.astro          ← 포스트 헤더, TOC, 본문, 배지
│   ├── components/
│   │   ├── Nav.astro                 ← top-nav 64px, 크림, ✦ 워드마크
│   │   ├── Hero.astro                ← 6/6 그리드 히어로 밴드
│   │   ├── FeatureCard.astro         ← 크림카드 (surface-card 배경)
│   │   ├── CodeWindowCard.astro      ← 다크 코드 윈도우
│   │   ├── PostCard.astro            ← 아카이브 리스트 카드
│   │   ├── CtaBand.astro             ← 코랄 풀블리드 CTA 밴드
│   │   └── Footer.astro              ← 다크 네이비, 4컬럼 링크
│   ├── pages/
│   │   ├── index.astro               ← 홈
│   │   ├── about.astro               ← About (about.md 내용 이식)
│   │   ├── search.astro              ← Pagefind 검색 페이지
│   │   ├── posts/
│   │   │   ├── index.astro           ← 전체 포스트 목록
│   │   │   └── [slug].astro          ← 단일 포스트
│   │   ├── categories/
│   │   │   └── [category].astro      ← 카테고리 아카이브
│   │   └── tags/
│   │       └── [tag].astro           ← 태그 아카이브
│   └── styles/
│       ├── _tokens.scss              ← DESIGN.md 전체 토큰 (색상/폰트/간격/라운드)
│       ├── _base.scss                ← body 리셋, 기본 타이포
│       ├── _nav.scss                 ← 네비게이션 스타일
│       ├── _hero.scss                ← 히어로 밴드 스타일
│       ├── _cards.scss               ← feature-card, post-card, code-window, CTA
│       ├── _post.scss                ← 포스트 본문 (한국어 가독성 포함)
│       ├── _footer.scss              ← 푸터 스타일
│       ├── _responsive.scss          ← 브레이크포인트 미디어쿼리
│       └── global.scss               ← 위 파일 전체 @import
├── public/
│   ├── assets/
│   │   ├── images/                   ← 기존 assets/images/ 복사
│   │   │   └── orion-logo.svg        ← ★ 오리온 별자리 로고 (완성)
│   │   └── pdfs/                     ← 기존 assets/pdfs/ 복사
│   └── 404.html                      ← Jekyll URL → Astro URL JS 리다이렉트
├── .github/
│   └── workflows/
│       └── deploy.yml                ← Astro 공식 GitHub Actions
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── ASTRO_PLAN.md                     ← 이 파일
├── TODO.MD                           ← 작업 체크리스트
├── DESIGN.md                         ← 디자인 시스템 원본 (변경 금지)
└── CLAUDE.MD                         ← AI 협업 가이드
```

---

## 5. Frontmatter 마이그레이션 맵핑

| Jekyll 키 | Astro 처리 | 방법 |
|---|---|---|
| `title` | `title` | 동일 유지 |
| `description` | `description` | 동일 유지 |
| `categories` | `categories` | 동일 유지 |
| `tags` | `tags` | 동일 유지 |
| `last_modified_at` | `pubDate` | 스크립트 일괄 rename |
| `layout: single` | 삭제 | 스크립트 일괄 삭제 |
| `author_profile` | 삭제 | 스크립트 일괄 삭제 |
| `toc: true` | `toc: true` | 동일 유지, PostLayout에서 처리 |
| `toc_sticky` | 삭제 | CSS position: sticky로 대체 |
| `read_time` | 삭제 | Astro에서 자동 계산 옵션 |
| `comments`, `share`, `related` | 삭제 | 미구현 (향후 추가 가능) |

---

## 6. Content Collection 스키마 (src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    categories: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    pubDate: z.coerce.date().optional(),
    last_modified_at: z.string().optional(),
    toc: z.boolean().optional().default(false),
    // Jekyll 호환 필드 — Astro에서 무시
    layout: z.string().optional(),
    author_profile: z.boolean().optional(),
    toc_sticky: z.boolean().optional(),
    read_time: z.boolean().optional(),
    comments: z.boolean().optional(),
    share: z.boolean().optional(),
    related: z.boolean().optional(),
    hidden: z.boolean().optional(),
  }),
});

export const collections = { posts };
```

---

## 7. URL 전략 (SEO 보호)

### 기존 Jekyll permalink 패턴
```
/:categories/:title/
예: /ai regulation/EU-AI-Act-분석/
```

### Astro 목표 URL
```
/posts/[slug]/
예: /posts/2026-04-28-b-1-ai-act-nlf/
```

### 리다이렉트 전략
GitHub Pages는 `_redirects` 파일을 지원하지 않으므로 `404.html` JS 리다이렉트 활용:

```html
<!-- public/404.html -->
<script>
  // Jekyll 경로 패턴을 Astro 경로로 매핑
  const path = window.location.pathname;
  // 리다이렉트 맵 또는 패턴 매칭
  window.location.replace('/posts/' + slug);
</script>
```

**보완책**: Astro `[slug].astro`에서 기존 Jekyll permalink와 동일한 경로도 `getStaticPaths`로 생성 (권장).

---

## 8. 검색 — Pagefind

```bash
npm install @pagefind/default-ui
```

**빌드 파이프라인:**
```json
// package.json
"scripts": {
  "build": "astro build && npx pagefind --site dist"
}
```

**특징:**
- 빌드 타임 인덱스 생성 → 런타임 JS 불필요
- 한국어 full-text 검색 지원 (언어 자동 감지)
- 기존 Lunr.js 대비: 번들 크기 작음, 더 빠른 검색 응답
- `src/pages/search.astro`에 Pagefind UI 컴포넌트 삽입

---

## 9. GitHub Actions 배포 (.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
        with:
          node-version: 20
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

**GitHub 설정 필요:**  
Repository Settings → Pages → Source: **GitHub Actions** 선택

---

## 10. astro.config.mjs

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://houuya.github.io',
  output: 'static',
  integrations: [],
});
```

---

## 11. 홈 페이지 섹션 구성

```
[Nav]
  [오리온 SVG 32px] HouuYa's Blog (Cormorant Garamond)     About · Posts · Search
  크림 배경 #faf9f5, 높이 64px
  SVG color: #141413 (dark lines on cream)

[Hero Band]  ← 크림 캔버스, 패딩 96px
  ┌─────────────────────┬──────────────────┐
  │ 규제의 언어로        │  ┌────────────┐  │
  │ 쓰는 AI 이야기       │  │ // blog.ts │  │
  │ (Cormorant 64px)    │  │ topics = [ │  │
  │                      │  │   "AI Act" │  │  ← CodeWindowCard
  │ AI 거버넌스, 제품 안전│  │   "Safety" │  │    다크 #181715
  │ EU·한국 기술 규제의  │  │ ]          │  │
  │ 실무 관점을 기록합니다│  └────────────┘  │
  │                      │                  │
  │ [최신 글 읽기 →]      │                  │
  │ (코랄 버튼)           │                  │
  │ [About me]           │                  │
  │ (Secondary 버튼)      │                  │
  └─────────────────────┴──────────────────┘

[Feature Cards]  ← 크림카드 #efe9de, 4-up (2+2)
  EU AI Act | AI 거버넌스 | 기술 표준 | 책

[CTA Band]  ← 코랄 #cc785c
  "글 전체 보기 →"

[최근 포스트 6개]  ← PostCard 리스트, 크림 배경
  제목 + 날짜 + 카테고리 badge

[Footer]  ← 다크 #181715
  ✦ HouuYa's Blog
  Posts · About · Categories · Tags
  © 2026 Seungho Bae
```

---

## 12. 단계별 타임라인

| Day | 작업 | 핵심 산출물 | 검증 포인트 |
|---|---|---|---|
| 1 | Astro 초기화 + 토큰 + 폰트 | `_tokens.scss`, `BaseLayout.astro` | 크림 배경 (#faf9f5) 로컬 확인 |
| 2 | 포스트 마이그레이션 | `src/content/posts/*.md`, `config.ts` | 빌드 오류 없음 |
| 3 | Nav + Hero + FeatureCards | `Nav.astro`, `Hero.astro`, `FeatureCard.astro` | 홈 데스크탑 스냅샷 |
| 4 | PostLayout + 아카이브 + Footer | `PostLayout.astro`, `[slug].astro`, `Footer.astro` | 포스트 렌더링 확인 |
| 5 | About + Responsive + Pagefind | `about.astro`, `_responsive.scss`, `search.astro` | 모바일 스냅샷 |
| 6 | GitHub Actions + QA | `deploy.yml`, 스크린샷 3장 | 라이브 URL 확인 |

---

## 13. 위험 및 대응

| 위험 | 가능성 | 대응 |
|---|---|---|
| `last_modified_at` → `pubDate` 60개 변환 오류 | 낮음 | PowerShell 스크립트 일괄 처리 후 수동 검수 |
| 포스트 내 Jekyll Liquid 태그 (`{% ... %}`) | 낮음 | grep으로 목록화 → 수동 처리 (대부분 없음) |
| 한글 카테고리명 URL 인코딩 문제 | 중간 | `getStaticPaths`에서 `encodeURIComponent` + slug 정규화 |
| GitHub Pages `_redirects` 미지원 | 높음 | `404.html` JS 리다이렉트 fallback 구현 |
| Pagefind 한국어 인덱스 누락 | 낮음 | 빌드 후 `npx pagefind` 실행 확인 |

---

## 14. 품질 게이트 체크리스트

- [ ] `npm run build` — 오류 없음
- [ ] 포스트 60개 전체 렌더링 확인 (`/posts/` 목록)
- [ ] 스냅샷 1: 홈 데스크탑 (1440px) — 크림 배경, 코랄 버튼, Cormorant Garamond 헤드라인
- [ ] 스냅샷 2: 홈 모바일 (375px) — 1컬럼 스택, 햄버거 메뉴
- [ ] 스냅샷 3: 단일 포스트 (1440px) — 본문 가독성, 코드블록 다크 배경
- [ ] Pagefind 검색: 한국어 키워드 테스트
- [ ] GitHub Actions 배포 성공 (Actions 탭 green)
- [ ] `https://houuya.github.io` 라이브 확인

---

*마지막 업데이트: 2026-06-24*  
*관련 문서: [DESIGN.md](DESIGN.md) · [TODO.MD](TODO.MD) · [CLAUDE.MD](CLAUDE.MD)*
