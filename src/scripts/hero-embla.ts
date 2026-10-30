export const HERO_AUTOPLAY_MS = 4800;
const DESKTOP_MQ = '(min-width: 1024px)';

type EmblaApi = {
  selectedScrollSnap: () => number;
  scrollTo: (n: number) => void;
  on: (event: string, cb: () => void) => void;
};

type AutoplayPlugin = {
  stop: () => void;
  play: () => void;
  reset: () => void;
};

function restartProgress(progressEl: HTMLElement) {
  progressEl.style.animation = 'none';
  void progressEl.offsetWidth;
  progressEl.style.animation = `hero-embla-progress ${HERO_AUTOPLAY_MS}ms linear forwards`;
}

function getHeroCarouselRoot(wrap: HTMLElement): HTMLElement | null {
  return (
    wrap.querySelector<HTMLElement>('[data-sw-carousel][data-hero-embla]') ??
    wrap.querySelector<HTMLElement>('[data-sw-carousel]')
  );
}

function bindHeroDots(wrapper: HTMLElement, api: EmblaApi, autoplay: AutoplayPlugin) {
  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) return;

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const syncProgress = () => {
    const index = api.selectedScrollSnap();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dots.forEach((dot, i) => {
      const progress = dot.querySelector<HTMLElement>('[data-hero-embla-progress]');
      if (!progress) return;

      progress.style.animation = 'none';
      progress.style.width = i === index && reducedMotion ? '100%' : '0%';

      if (i === index && !reducedMotion) {
        restartProgress(progress);
      }
    });
  };

  const setActive = () => {
    const index = api.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
    syncProgress();
  };

  dots.forEach((dot) => {
    const index = Number(dot.getAttribute('data-hero-embla-dot'));
    dot.addEventListener('click', () => {
      api.scrollTo(index);
      autoplay.reset();
    });
  });

  api.on('select', setActive);
  api.on('reInit', setActive);
  setActive();
}

async function initHeroCarousel(wrap: HTMLElement) {
  if (wrap.dataset.heroEmblaReady === 'true') return;

  const carouselRoot = getHeroCarouselRoot(wrap);
  if (!carouselRoot) return;

  const [{ createCarousel }, { default: Autoplay }] = await Promise.all([
    import('@starwind-ui/runtime/carousel'),
    import('embla-carousel-autoplay'),
  ]);

  const autoplay = Autoplay({
    delay: HERO_AUTOPLAY_MS,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  try {
    const instance = createCarousel(carouselRoot, {
      opts: { loop: true, align: 'start', duration: 20 },
      plugins: [autoplay],
    });

    wrap.dataset.heroEmblaReady = 'true';
    bindHeroDots(wrap, instance.api as EmblaApi, autoplay as AutoplayPlugin);

    const pauseWhenHidden = () => {
      if (document.hidden) autoplay.stop();
      else autoplay.play();
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) autoplay.play();
        else autoplay.stop();
      },
      { threshold: 0.2 },
    );
    io.observe(carouselRoot);

    autoplay.play();
  } catch (error) {
    console.error('[hero-embla] init failed', error);
    window.setTimeout(() => {
      wrap.dataset.heroEmblaReady = 'false';
      void initHeroCarousel(wrap);
    }, 100);
  }
}

async function initHeroCarousels(root: ParentNode = document) {
  if (!window.matchMedia(DESKTOP_MQ).matches) return;

  const wraps = [...root.querySelectorAll<HTMLElement>('[data-hero-embla-wrap]')];
  await Promise.all(wraps.map((wrap) => initHeroCarousel(wrap)));
}

export function setupHeroEmbla() {
  const run = () => {
    requestAnimationFrame(() => {
      void initHeroCarousels();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  window.matchMedia(DESKTOP_MQ).addEventListener('change', (event) => {
    if (event.matches) run();
  });

  document.addEventListener('astro:page-load', run);
  document.addEventListener('astro:after-swap', run);
}
