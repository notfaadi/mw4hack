/** Blog index topic filters + Starwind sort select. */

const boundGrids = new WeakSet<HTMLElement>();

export function initBlogIndexFilters(emptyMessage: string) {
  const grid = document.getElementById('blog-grid');
  const emptyEl = document.getElementById('blog-empty');
  const sortRoot = document.getElementById('blog-sort-select');
  const featuredSlot = document.querySelector<HTMLElement>('[data-blog-featured]');
  if (!grid || boundGrids.has(grid)) return;
  boundGrids.add(grid);

  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-blog-filter]')];

  const cards = () => [...grid.querySelectorAll<HTMLElement>('[data-blog-card]')];

  const normalizeTag = (value: string | null | undefined) => (value ?? '').trim().toLowerCase();

  const activeTag = () =>
    normalizeTag(
      document.querySelector<HTMLButtonElement>('[data-blog-filter][aria-pressed="true"]')?.getAttribute(
        'data-blog-filter',
      ),
    ) || 'all';

  const getSortSelectRoot = () => sortRoot?.querySelector<HTMLElement>('[data-sw-select]');

  const getSort = () => {
    const root = getSortSelectRoot();
    const fromAttr = root?.getAttribute('data-value');
    if (fromAttr) return fromAttr;
    const input = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');
    return input?.value || 'newest';
  };

  const isBlogSortEvent = (event: Event) => {
    const root = getSortSelectRoot();
    if (!root || !sortRoot) return false;
    return event.target === root || root.contains(event.target as Node);
  };

  const compareCards = (a: HTMLElement, b: HTMLElement, sort: string) => {
    const tsA = Number(a.getAttribute('data-ts') ?? 0);
    const tsB = Number(b.getAttribute('data-ts') ?? 0);
    const readA = Number(a.getAttribute('data-read-minutes') ?? 0);
    const readB = Number(b.getAttribute('data-read-minutes') ?? 0);
    if (sort === 'oldest') return tsA - tsB;
    if (sort === 'short') return readA - readB;
    if (sort === 'long') return readB - readA;
    return tsB - tsA;
  };

  const setFilterActive = (active: HTMLButtonElement) => {
    filters.forEach((btn) => {
      const pressed = btn === active;
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      btn.classList.toggle('is-active', pressed);
    });
  };

  const apply = () => {
    const tag = activeTag();
    const sort = getSort();
    const items = cards();

    const sorted = [...items].sort((a, b) => compareCards(a, b, sort));
    sorted.forEach((el) => grid.appendChild(el));

    let visibleCount = 0;
    items.forEach((el) => {
      const cardTag = normalizeTag(el.getAttribute('data-tag'));
      const match = tag === 'all' || cardTag === tag;
      el.classList.toggle('hidden', !match);
      if (match) visibleCount += 1;
    });

    if (featuredSlot) {
      const featuredTag = normalizeTag(featuredSlot.getAttribute('data-tag'));
      const showFeatured = tag === 'all' || featuredTag === tag;
      featuredSlot.classList.toggle('hidden', !showFeatured);
    }

    if (emptyEl) {
      emptyEl.classList.toggle('hidden', visibleCount > 0);
      emptyEl.textContent = emptyMessage;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      setFilterActive(btn);
      apply();
    });
  });

  const onSortChange = (event: Event) => {
    if (!isBlogSortEvent(event)) return;
    apply();
  };

  document.addEventListener('starwind:value-change', onSortChange);

  requestAnimationFrame(apply);
  window.setTimeout(apply, 100);
}

export function setupBlogIndexPage() {
  const run = () => {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    const root = grid.closest<HTMLElement>('[data-blog-index]');
    const emptyMessage = root?.getAttribute('data-empty-filter') ?? 'No articles match this filter.';
    initBlogIndexFilters(emptyMessage);
  };

  run();
  document.addEventListener('astro:page-load', run);
}
