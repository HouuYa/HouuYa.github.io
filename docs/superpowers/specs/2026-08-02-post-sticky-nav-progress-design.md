# 포스트 상세 페이지: 고정 네비 + 읽기 진행률 바

## 배경

포스트 상세 페이지(`src/layouts/PostLayout.astro`)에는 `← 뒤로가기` / `목록으로 →` 네비게이션이 본문 최상단에 있지만, 스크롤하면 화면 밖으로 사라진다. 사용자가 스크롤 중에도 이 네비게이션을 계속 사용할 수 있고, 동시에 글의 어느 지점을 읽고 있는지 알 수 있는 시각적 표시가 필요하다.

## 요구사항

1. `.post__nav`(← 뒤로가기 / 목록으로 →)를 스크롤해도 화면 상단에 고정한다.
2. 고정된 네비 바로 아래에, 스크롤 위치에 따라 채워지는 얇은 가로 진행률 바를 추가한다.

## 결정된 디자인

옵션 3가지(① 고정 바 아래 진행률 바, ② 고정 바 안에 퍼센트 숫자, ③ 화면 우측 세로 바)를 제시했고, 사용자가 **①(상단 고정 바 + 그 아래 얇은 진행률 바)**를 선택함. 이유: Medium/네이버 블로그 등에서 흔히 쓰이는 검증된 패턴이며, 모바일에서도 자연스럽고 구현이 단순함.

### 구조 (마크업)

`src/layouts/PostLayout.astro`의 기존 `.post__nav` 블록을 다음으로 교체:

```astro
<div class="post__nav">
  <button type="button" class="post__nav-link" onclick="history.back()">← 뒤로가기</button>
  <a href="/posts/" class="post__nav-link">목록으로 →</a>
  <div class="post__progress-track">
    <div class="post__progress-fill" id="post-progress-fill"></div>
  </div>
</div>
```

- `.post__nav`가 sticky 컨테이너 역할을 겸함 (링크 두 개 + 진행률 트랙을 세로로 쌓음).
- 진행률 바는 `id="post-progress-fill"`로 스크립트에서 직접 참조.

### 동작 (스크립트)

`PostLayout.astro` 하단에 인라인 `<script>` 추가 (프레임워크 없는 정적 사이트이므로 바닐라 JS):

```js
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

- `scrollable <= 0`(문서 높이가 화면 높이 이하인 매우 짧은 글)인 경우 0으로 나누기 없이 0%로 처리.
- `scroll`/`resize` 모두 `requestAnimationFrame`으로 스로틀링해 성능 영향 최소화.
- Astro는 기본적으로 페이지당 한 번만 스크립트를 번들링하므로 별도 컴포넌트 분리 없이 `PostLayout.astro` 내 인라인 script로 충분 (이 레이아웃을 쓰는 곳은 포스트 상세 페이지 하나뿐).

### 스타일

기존 `<style lang="scss">` 블록의 `&__nav`, `&__nav-link` 규칙을 다음과 같이 수정/추가 (토큰만 사용):

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

- `position: sticky`이므로 `.post-layout`(max-width: 720px, margin-inline: auto) 내부에서 그 폭 그대로 고정됨 — 별도 전체 너비 처리 불필요.
- `z-index: 10`은 현재 페이지 내 다른 요소와 충돌하지 않는 낮은 값(사이트 전역에서 modal 등 상위 레이어 없음 확인됨).

## 범위 밖 (Out of scope)

- 목차(TOC)와의 연동, 헤딩별 진행 마커 — 요청되지 않음.
- 그림자(box-shadow) 효과 — 사용자에게 물었으나 이번 라운드에서 확정하지 않음, 기본은 `border-bottom` 1px만 사용하고 필요시 추후 조정.
- 데스크톱/모바일 분기 스타일 — 진행률 바가 `.post-layout` 폭(최대 720px)을 그대로 따르므로 별도 반응형 처리 불필요.

## 검증

`npm run dev`로 로컬 확인:
- 포스트 상세 페이지에서 스크롤 다운 시 `← 뒤로가기 / 목록으로 →`가 화면 상단에 고정되어 계속 보이는지 확인
- 스크롤함에 따라 바로 아래 진행률 바가 좌→우로 채워지는지, 맨 아래에서 100%에 근접하는지 확인
- 스크롤 업 시 진행률 바가 줄어드는지 확인
- 매우 짧은 포스트(스크롤 여지가 거의 없는 글)에서 오류 없이 0%로 표시되는지 확인
- 모바일 폭에서 고정 바와 진행률 바가 겹치거나 잘리지 않는지 확인
