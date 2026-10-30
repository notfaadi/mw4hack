import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel';

export const HERO_AUTOPLAY_MS = 4800;

type AutoplayPlugin = ReturnType<typeof Autoplay>;

const instances = new WeakMap<HTMLElement, EmblaCarouselType>();

function restartProgress(progressEl: HTMLElement) {
  progressEl.style.animation = 'none';
  void progressEl.offsetWidth;
  progressEl.style.animation = `hero-embla-progress ${HERO_AUTOPLAY_MS}ms linear forwards`;
}

function getViewport(wrap: HTMLElement): HTMLElement | null {
  return wrap.querySelector<HTMLElement>('[data-sw-carousel-viewport]');
}

const autoplayByWrap = new WeakMap<HTMLElement, AutoplayPlugin>();

function bindHeroControlsOnce(wrap: HTMLElement) {
  if (wrap.dataset.heroEmblaControlsBound === 'true') return;
  wrap.dataset.heroEmblaControlsBound = 'true';

  wrap.querySelector<HTMLButtonElement>('[data-hero-embla-prev]')?.addEventListener('click', () => {
    const embla = instances.get(wrap);
    if (!embla) return;
    embla.scrollPrev();
    autoplayByWrap.get(wrap)?.reset();
  });
  wrap.querySelector<HTMLButtonElement>('[data-hero-embla-next]')?.addEventListener('click', () => {
    const embla = instances.get(wrap);
    if (!embla) return;
    embla.scrollNext();
    autoplayByWrap.get(wrap)?.reset();
  });

  const dots = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const embla = instances.get(wrap);
      if (!embla) return;
      const index = Number(dot.getAttribute('data-hero-embla-dot'));
      embla.scrollTo(index);
      autoplayByWrap.get(wrap)?.reset();
    });
  });
}

function syncHeroUi(wrap: HTMLElement, embla: EmblaCarouselType) {
  const dots = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));
  const index = embla.selectedScrollSnap();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  dots.forEach((dot, i) => {
    const active = i === index;
    dot.dataset.active = active ? 'true' : 'false';
    dot.setAttribute('aria-selected', active ? 'true' : 'false');
    dot.tabIndex = active ? 0 : -1;

    const progress = dot.querySelector<HTMLElement>('[data-hero-embla-progress]');
    if (!progress) return;
    progress.style.animation = 'none';
    progress.style.width = i === index && reducedMotion ? '100%' : '0%';
    if (i === index && !reducedMotion) restartProgress(progress);
  });
}

function destroyHeroCarousel(wrap: HTMLElement) {
  const existing = instances.get(wrap);
  if (existing) {
    existing.destroy();
    instances.delete(wrap);
  }
  wrap.dataset.heroEmblaReady = 'false';
}

function initHeroCarousel(wrap: HTMLElement): boolean {
  if (wrap.dataset.heroEmblaReady === 'true') return true;

  const viewport = getViewport(wrap);
  if (!viewport || viewport.clientWidth <= 0) return false;

  destroyHeroCarousel(wrap);

  const autoplay = Autoplay({
    delay: HERO_AUTOPLAY_MS,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  });

  const embla = EmblaCarousel(
    viewport,
    { loop: true, align: 'start', duration: 28, skipSnaps: false },
    [autoplay],
  );

  instances.set(wrap, embla);
  autoplayByWrap.set(wrap, autoplay);
  wrap.dataset.heroEmblaReady = 'true';
  bindHeroControlsOnce(wrap);

  embla.on('select', () => syncHeroUi(wrap, embla));
  embla.on('reInit', () => syncHeroUi(wrap, embla));
  syncHeroUi(wrap, embla);

  window.requestAnimationFrame(() => {
    embla.reInit();
    autoplay.play();
    syncHeroUi(wrap, embla);
  });

  return true;
}

function initAllHeroCarousels(root: ParentNode = document) {
  const wraps = [...root.querySelectorAll<HTMLElement>('[data-hero-embla-wrap]')];
  for (const wrap of wraps) {
    initHeroCarousel(wrap);
  }
}

function scheduleHeroInit(root: ParentNode = document) {
  const attempts = [0, 50, 150, 400, 800];
  for (const delay of attempts) {
    window.setTimeout(() => initAllHeroCarousels(root), delay);
  }
}

function observeHeroWraps() {
  document.querySelectorAll<HTMLElement>('[data-hero-embla-wrap]').forEach((wrap) => {
    if (wrap.dataset.heroEmblaObserved === 'true') return;
    wrap.dataset.heroEmblaObserved = 'true';

    const ro = new ResizeObserver(() => {
      if (wrap.dataset.heroEmblaReady !== 'true') initHeroCarousel(wrap);
      else instances.get(wrap)?.reInit();
    });
    ro.observe(wrap);
  });
}

export function setupHeroEmbla() {
  const run = () => {
    scheduleHeroInit();
    observeHeroWraps();
  };

  run();

  document.addEventListener('astro:before-swap', () => {
    document.querySelectorAll<HTMLElement>('[data-hero-embla-wrap]').forEach(destroyHeroCarousel);
  });
  document.addEventListener('astro:page-load', run);
  document.addEventListener('astro:after-swap', run);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  }
}
