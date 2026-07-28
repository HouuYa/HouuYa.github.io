# CLAUDE.MD — HouuYa's Blog AI 협업 가이드

> 소유자: Seungho Bae (배승호)  
> URL: https://houuya.github.io  
> 언어: 한국어 (ko-KR)  
> 마지막 업데이트: 2026-06-24

---

## 현재 작업 상태

**Astro 전환 진행 중** — Jekyll + Minimal Mistakes → Astro 5.x 마이그레이션

| 문서 | 역할 |
|---|---|
| **[ASTRO_PLAN.md](ASTRO_PLAN.md)** | 전환 실행 계획 전체 (확정된 결정사항, 구조, 타임라인) |
| **[TODO.MD](TODO.MD)** | Phase별 작업 체크리스트 (현재 진행 상태 추적) |
| **[DESIGN.md](DESIGN.md)** | 디자인 시스템 원본 — 토큰, 컴포넌트, 규칙 (변경 금지) |

**작업 시작 전 반드시 위 세 문서를 읽을 것.**

---

## 프로젝트 개요

**HouuYa's Blog**는 AI 규제, 제품 안전, 기술 표준 분야의 전문 지식을 공유하는 개인 블로그입니다.  
현재 **Astro 5.x로 전환 중**이며, DESIGN.md 기반 에디토리얼 디자인 시스템을 새롭게 적용합니다.

---

## 기술 스택 (전환 목표)

| 구분 | 기술 | 비고 |
|------|------|------|
| 정적 생성기 | **Astro 5.x** | Jekyll 대체 |
| 스타일 | **SCSS** (토큰 기반) | Minimal Mistakes 제거 |
| 디스플레이 폰트 | **Cormorant Garamond** | Copernicus 대체 (Google Fonts) |
| 본문/UI 폰트 | **Inter** | StyreneB 대체 (Google Fonts) |
| 코드 폰트 | **JetBrains Mono** | Google Fonts |
| 검색 | **Pagefind** | 정적 빌드 인덱스 |
| 호스팅 | **GitHub Pages** | GitHub Actions 배포 |
| 분석 | Google Analytics GA4 | `G-LJKDH2835N` |
| 로고 | **오리온 별자리 SVG** | `public/assets/images/orion-logo.svg` |
| 태그라인 | "Connecting the constellation of data" | 한국어: "데이터의 별자리를 잇다" |

---

## 목표 디렉토리 구조 (Astro)

```
HouuYa.github.io/
├── src/
│   ├── content/
│   │   ├── config.ts             # Content Collection 스키마
│   │   └── posts/                # _posts/*.md → 이동
│   ├── layouts/
│   │   ├── BaseLayout.astro      # head, Nav, Footer, GA4
│   │   └── PostLayout.astro      # 포스트 헤더, TOC, 본문
│   ├── components/
│   │   ├── Nav.astro             # top-nav 64px, 크림, 오리온 SVG 워드마크
│   │   ├── Hero.astro            # 6/6 그리드 히어로
│   │   ├── FeatureCard.astro     # 크림카드
│   │   ├── CodeWindowCard.astro  # 다크 코드 윈도우
│   │   ├── PostCard.astro        # 아카이브 리스트 카드
│   │   ├── CtaBand.astro         # 코랄 CTA 밴드
│   │   └── Footer.astro          # 다크 네이비 푸터
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── search.astro
│   │   ├── posts/[slug].astro
│   │   ├── categories/[category].astro
│   │   └── tags/[tag].astro
│   └── styles/
│       ├── _tokens.scss          # ★ DESIGN.md 전체 토큰
│       ├── _base.scss
│       ├── _nav.scss
│       ├── _hero.scss
│       ├── _cards.scss
│       ├── _post.scss
│       ├── _footer.scss
│       ├── _responsive.scss
│       └── global.scss           # 전체 @import 진입점
├── public/
│   ├── assets/images/            # 이미지 자산
│   ├── assets/pdfs/              # PDF 자산
│   └── 404.html                  # Jekyll URL 리다이렉트
├── .github/workflows/deploy.yml  # Astro 공식 GitHub Actions
├── astro.config.mjs
├── ASTRO_PLAN.md                 # 실행 계획
├── TODO.MD                       # 작업 체크리스트
├── DESIGN.md                     # 디자인 시스템 (변경 금지)
└── CLAUDE.MD                     # 이 파일
```

---

## 디자인 시스템 핵심 규칙

원본: [DESIGN.md](DESIGN.md) — 모든 세부 토큰과 컴포넌트 스펙은 이 파일을 참조.

### 색상 토큰 (절대 hex 직접 사용 금지, 반드시 SCSS 변수 사용)

```scss
$color-canvas:        #faf9f5;   // 기본 배경 (크림)
$color-primary:       #cc785c;   // 코랄 CTA
$color-primary-active:#a9583e;   // 버튼 호버
$color-surface-card:  #efe9de;   // 피처카드 배경
$color-surface-dark:  #181715;   // 코드 윈도우, 푸터
$color-ink:           #141413;   // 기본 텍스트
$color-on-dark:       #faf9f5;   // 다크 서피스 텍스트
$color-on-dark-soft:  #a09d96;   // 다크 서피스 보조 텍스트
$color-hairline:      #e6dfd8;   // 1px 보더
```

### 서피스 3단계 페이징 리듬 (엄수)

```
크림 캔버스 → 크림 카드 → 다크 네이비
```

동일 서피스 2개를 연속 배치하지 않는다.

### 폰트 계층 규칙 (엄수)

- `h1, h2, h3` → **Cormorant Garamond, weight 400**, 음수 letter-spacing 필수
- `body, nav, button, label` → **Inter, weight 400/500**
- `code, pre` → **JetBrains Mono, weight 400**
- **세리프 헤드라인에 bold(700) 절대 금지**

### 오리온 로고 사용 규칙

**파일:** `public/assets/images/orion-logo.svg`  
로고 SVG는 `currentColor`를 사용하므로 부모 요소의 `color`로 별/선 색상이 결정된다.

```css
/* 크림 배경 (Nav): 어두운 별자리 */
.nav-logo { color: #141413; }

/* 다크 배경 (Footer/Hero): 밝은 별자리 */
.footer-logo { color: #faf9f5; }
```

- Betelgeuse(좌상, 큰 별) = 앰버 `#e8a55a` (`$color-accent-amber`) — 고정
- Rigel(우하, 큰 별) = 틸 `#5db8a6` (`$color-accent-teal`) — 고정
- 나머지 6개 별 + 연결선 = `currentColor`로 배경에 따라 자동 전환

### 브레이크포인트

| 구간 | 핵심 변경 |
|---|---|
| `< 768px` | 햄버거 메뉴, 1컬럼, 카드 1-up |
| `768–1024px` | 카드 2-up |
| `> 1024px` | 카드 4-up, 전체 nav, 히어로 6/6 |
| `> 1440px` | 콘텐츠 max-width: 1200px |

---

## 포스트 작성법 (Astro)

```yaml
---
title: "포스트 제목"
description: "포스트 설명 (OG 메타태그에 사용)"
categories:
  - AI Regulation
tags:
  - EU AI Act
pubDate: 2026-06-24
toc: true           # 목차 표시 여부 (PostLayout에서 처리)
---

본문 내용...
```

**주의사항:**
- `layout`, `author_profile`, `toc_sticky`, `read_time`, `comments`, `share` → Astro에서 불필요, 작성 금지
- 한국어 본문: CSS `word-break: keep-all` 자동 적용 (`_post.scss`)
- 코드블록: JetBrains Mono + `$color-surface-dark` 배경 자동 적용

---

## 로컬 개발 (Astro)

```bash
# 의존성 설치
npm install

# 로컬 개발 서버
npm run dev
# 접속: http://localhost:4321

# 프로덕션 빌드 (Pagefind 포함)
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 배포

- **방식**: GitHub Actions (`withastro/action@v3`) → GitHub Pages 정적 배포
- **트리거**: `master` 브랜치 push 시 자동 빌드/배포
- **설정 위치**: `.github/workflows/deploy.yml`
- **GitHub 설정**: Repository Settings → Pages → Source: **GitHub Actions**
- **라이브 URL**: https://houuya.github.io

---

## AI 협업 주의사항

1. **작업 시작 전**: [ASTRO_PLAN.md](ASTRO_PLAN.md)와 [TODO.MD](TODO.MD) 먼저 확인
2. **디자인 결정**: [DESIGN.md](DESIGN.md)를 단일 진실 원천으로 사용 — 임의 색상/폰트 변경 금지
3. **SCSS 토큰**: hex 직접 사용 금지, 반드시 `$color-*` 변수 사용
4. **서피스 리듬**: 크림 → 크림카드 → 다크 네이비 순서 준수
5. **세리프 폰트**: Cormorant Garamond는 weight 400만 사용, bold 금지
6. **한국어 가독성**: `word-break: keep-all`, `overflow-wrap: break-word` 본문 필수
7. **DESIGN.md 수정 금지**: 이 파일은 디자인 시스템 원본이므로 절대 변경하지 않음

---

## 레거시 참고 (전환 전 Jekyll 구조)

전환 완료 후 삭제 예정. 현재는 루트에 Jekyll 파일들이 공존.

| Jekyll 파일 | 상태 |
|---|---|
| `_config.yml` | 레거시 — 참조용 보존 |
| `_posts/*.md` | `src/content/posts/`로 이동 중 |
| `assets/css/main.scss` | 레거시 — 새 스타일로 대체 |
| `Gemfile` | 레거시 — 전환 후 삭제 |
| `_includes/`, `_layouts/` | 레거시 — Astro 컴포넌트로 대체 |

---

## 참고 자료

- [Astro 공식 문서](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Pagefind 검색 문서](https://pagefind.app)
- [GitHub Pages + Astro 배포 가이드](https://docs.astro.build/en/guides/deploy/github/)

---

*마지막 업데이트: 2026-06-24 (Astro 전환 계획 확정)*
