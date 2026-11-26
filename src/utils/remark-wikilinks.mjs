// Obsidian 위키링크([[파일명]], [[파일명|표시텍스트]], [[파일명#헤딩]])를 블로그 링크로 변환하는 remark 플러그인.
//
// - 대상은 _posts/ 안의 파일명(확장자 제외)으로 찾는다. 'a/b/파일명'처럼 Obsidian 볼트 경로가 붙어 있어도
//   마지막 경로 조각(basename)만 사용한다.
// - 대상 글에 permalink가 있으면 그 주소로, 없으면 /posts/<glob loader id>/ 로 연결한다.
//   (src/pages/[...slug].astro 의 라우팅 규칙과 동일)
// - 블로그에 없는 노트(예: Obsidian 내부 자료)는 대괄호만 걷어내고 일반 텍스트로 남긴다.
import fs from 'node:fs';
import path from 'node:path';
import { slug as githubSlug } from 'github-slugger';

const WIKILINK_RE = /\[\[([^\[\]]+?)\]\]/g;

function readFrontmatterField(source, field) {
  const fm = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const line = fm[1].match(new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm'));
  if (!line) return null;
  return line[1].replace(/^['"]|['"]$/g, '').trim() || null;
}

function buildIndex(postsDir) {
  const index = new Map();
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith('.md')) continue;
    const name = file.slice(0, -3);
    const source = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const permalink = readFrontmatterField(source, 'permalink');
    const explicitSlug = readFrontmatterField(source, 'slug');
    let href;
    if (permalink) {
      href = `/${permalink.replace(/^\/+|\/+$/g, '')}/`;
    } else {
      href = `/posts/${explicitSlug ?? githubSlug(name)}/`;
    }
    index.set(name.normalize('NFC'), href);
  }
  return index;
}

export default function remarkWikilinks({ postsDir = './_posts' } = {}) {
  const dir = path.resolve(postsDir);

  return (tree) => {
    // 글을 새로 추가해도 dev 서버 재시작 없이 반영되도록 변환할 때마다 색인을 새로 만든다 (파일 수가 적어 비용 무시 가능).
    const index = buildIndex(dir);

    const walk = (node) => {
      if (!Array.isArray(node.children)) return;
      // 링크·코드 내부는 건드리지 않는다.
      if (node.type === 'link' || node.type === 'linkReference') return;

      const next = [];
      for (const child of node.children) {
        if (child.type !== 'text' || !child.value.includes('[[')) {
          walk(child);
          next.push(child);
          continue;
        }

        const value = child.value;
        let last = 0;
        for (const m of value.matchAll(WIKILINK_RE)) {
          if (m.index > last) next.push({ type: 'text', value: value.slice(last, m.index) });

          // [[target#heading|alias]] — 표 안에서는 Obsidian이 '\|'로 이스케이프하므로 함께 처리
          const [targetPart, alias] = m[1].replace(/\\\|/g, '|').split('|');
          const [rawTarget, heading] = targetPart.split('#');
          const basename = rawTarget.split('/').pop().trim().replace(/\.md$/, '');
          const label = (alias ?? basename).trim();
          const href = index.get(basename.normalize('NFC'));

          if (href) {
            const hash = heading ? `#${githubSlug(heading.trim())}` : '';
            next.push({
              type: 'link',
              url: href + hash,
              children: [{ type: 'text', value: label }],
            });
          } else {
            next.push({ type: 'text', value: label });
          }
          last = m.index + m[0].length;
        }
        if (last < value.length) next.push({ type: 'text', value: value.slice(last) });
      }
      node.children = next;
    };

    walk(tree);
  };
}
