# 포스트 상세 페이지: 고정 네비 + 읽기 진행률 바 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 포스트 상세 페이지의 `← 뒤로가기 / 목록으로 →` 네비게이션을 스크롤해도 화면 상단에 고정하고, 그 아래 스크롤 위치를 보여주는 코랄색 진행률 바를 추가한다.

**Architecture:** `src/layouts/PostLayout.astro` 한 파일만 수정. `.post__nav`를 `position: sticky`로 고정하고 그 안에 진행률 트랙/필 두 개의 `div`를 추가한다. 진행률 계산은 프레임워크 없이 바닐라 JS `<script>`로, `scroll`/`resize` 이벤트를 `requestAnimationFrame`으로 스로틀링해 처리한다.

**Tech Stack:** Astro 5.x (`.astro` 컴포넌트), SCSS (`@use '../styles/tokens' as *`), 바닐라 JS (프레임워크 없음, 이 프로젝트에 클라이언트 JS 프레임워크 미포함).

## Global Constraints

- SCSS에서 hex 색상 직접 사용 금지 — 반드시 `$color-*` 토큰 사용 (CLAUDE.MD).
- 이 프로젝트에는 자동화 테스트 스위트가 없음 (`package.json`에 test 스크립트 없음) — 검증은 `npx astro check`(타입/구문) + `npm run dev`를 통한 수동 브라우저 확인으로 수행한다.
- 스펙 원본: `docs/superpowers/specs/2026-08-02-post-sticky-nav-progress-design.md` (커밋 `40ee3e2b`).

---

## Task 1: 고정 네비 + 진행률 바 마크업/스타일/스크립트 추가

**Files:**
- Modify: `src/layouts/PostLayout.astro:54-57` (마크업), `src/layouts/PostLayout.astro:113-134` (스타일), `src/layouts/PostLayout.astro:92` 이후 (스크립트 블록 신규 추가)

**Interfaces:**
- Consumes: 없음 (이 레이아웃을 사용하는 다른 컴포넌트나 페이지 없음 — `src/pages/posts/[slug].astro`가 유일한 소비자이며 props만 전달, 이번 변경과 무관).
- Produces: DOM에 `id="post-progress-fill"` 엘리먼트, CSS 클래스 `.post__nav`(sticky 컨테이너), `.post__nav-link`, `.post__progress-track`, `.post__progress-fill`. 이후 다른 태스크에서 참조할 계획 없음 (단일 태스크로 완결).

### Steps

- [ ] **Step 1: 마크업 교체 — `.post__nav`에 진행률 트랙/필 추가**

`src/layouts/PostLayout.astro`의 54-57행:

```astro
          <div class="post__nav">
            <button type="button" class="post__nav-link" onclick="history.back()">← 뒤로가기</button>
            <a href="/posts/" class="post__nav-link">목록으로 →</a>
          </div>
```

을 다음으로 교체:

```astro
          <div class="post__nav">
            <button type="button" class="post__nav-link" onclick="history.back()">← 뒤로가기</button>
            <a href="/posts/" class="post__nav-link">목록으로 →</a>
            <div class="post__progress-track">
              <div class="post__progress-fill" id="post-progress-fill"></div>
            </div>
          </div>
```

- [ ] **Step 2: 스타일 교체 — `.post__nav`를 sticky로, `.post__progress-*` 추가**

같은 파일의 `<style lang="scss">` 블록 내 113-134행:

```scss
    &__nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $spacing-lg;
    }

    &__nav-link {
      display: inline-block;
      font-family: $font-body;
      font-size: $text-body-sm-size;
      color: $color-muted;
      text-decoration: none;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;

      &:hover {
        color: $color-primary;
      }
    }
```

을 다음으로 교체:

```scss
    &__nav {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      background: $color-canvas;
      border-bottom: 1px solid $color-hairline;
      padding-block: $spacing-sm;
      margin-bottom: $spacing-lg;
    }

    &__nav-link {
      display: inline-block;
      font-family: $font-body;
      font-size: $text-body-sm-size;
      color: $color-muted;
      text-decoration: none;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;

      &:hover {
        color: $color-primary;
      }
    }

    &__progress-track {
      flex-basis: 100%;
      height: 2px;
      background: $color-hairline;
      margin-top: $spacing-sm;
    }

    &__progress-fill {
      height: 100%;
      width: 0%;
      background: $color-primary;
      transition: width 0.1s ease-out;
    }
```

- [ ] **Step 3: 스크립트 블록 추가 — 스크롤 진행률 계산**

`</BaseLayout>` 태그(92행) 바로 다음, `<style lang="scss">` 블록(94행) 앞에 새 `<script>` 블록 삽입:

```astro
<script>
  const fill = document.getElementById('post-progress-fill');
  if (fill) {
    let ticking = false;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0
        ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100))
        : 0;
      fill.style.width = `${pct}%`;
      ticking = false;
    };
    update();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update);
  }
</script>
```

- [ ] **Step 4: 빌드/타입 체크로 구문 오류 확인**

Run: `npx astro check`
Expected: 에러 0건 (경고는 기존에 있던 것과 동일한 수준이면 무관)

- [ ] **Step 5: 개발 서버로 수동 브라우저 확인**

Run: `npm run dev` (이미 백그라운드에서 실행 중이면 HMR로 자동 반영되므로 생략 가능)

브라우저에서 임의의 포스트 상세 페이지(예: `http://localhost:4321/posts/`에서 아무 글이나 클릭) 열고 확인:
1. 페이지를 아래로 스크롤 — `← 뒤로가기 / 목록으로 →`가 화면 최상단에 계속 고정되어 보이는가
2. 스크롤함에 따라 그 바로 아래 얇은 바가 왼쪽에서 오른쪽으로 코랄색으로 채워지는가
3. 페이지 맨 아래까지 스크롤 시 바가 100%에 가깝게 채워지는가
4. 다시 위로 스크롤 시 바가 줄어드는가
5. "← 뒤로가기" 클릭 시 이전 페이지로, "목록으로 →" 클릭 시 `/posts/`로 이동하는가 (기존 동작 유지 확인)
6. 브라우저 창을 모바일 폭으로 좁혀도 고정 바와 진행률 바가 겹치거나 잘리지 않는가
7. 매우 짧은 포스트(스크롤 여지가 거의 없는 글, 있다면)에서 진행률 바가 에러 없이 0%로 표시되는가 — 없다면 브라우저 개발자 도구로 뷰포트 높이를 늘려 문서 높이 이하로 만들어 확인

Expected: 위 7개 항목 모두 스펙(`docs/superpowers/specs/2026-08-02-post-sticky-nav-progress-design.md`)대로 동작.

- [ ] **Step 6: 커밋**

```bash
git add src/layouts/PostLayout.astro
git commit -m "$(cat <<'EOF'
Add sticky nav and scroll progress bar to post detail page

The back/list nav now stays fixed at the top while scrolling, with a
coral progress bar beneath it showing read position through the post.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review Notes

- **스펙 커버리지:** 요구사항 1(고정 네비) → Step 2 `position: sticky`. 요구사항 2(진행률 바) → Step 1(마크업) + Step 2(스타일) + Step 3(스크립트). 스펙의 "0으로 나누기 방지" → Step 3 `scrollable > 0` 삼항 처리. "z-index 충돌 없음" → 기존 확인 사항으로 스펙에 이미 명시, 재확인 불필요. 모두 커버됨.
- **플레이스홀더 스캔:** 없음 — 모든 코드 블록이 그대로 복사/적용 가능한 완성 코드.
- **타입/네이밍 일관성:** `id="post-progress-fill"` (마크업) ↔ `document.getElementById('post-progress-fill')` (스크립트) 일치 확인. 클래스명 `.post__nav`, `.post__nav-link`, `.post__progress-track`, `.post__progress-fill` 마크업-스타일 간 일치 확인.
