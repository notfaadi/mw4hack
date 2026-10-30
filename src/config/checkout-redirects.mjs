/** External checkout targets (affiliate / partner). Never use as visible href — only via /go/* redirects. */
export const CHECKOUT_URLS = {
  mw4: 'https://zadeyo.com/go/FDI?to=%2Fproducts%2Fmw4',
  cloudDma: 'https://zadeyo.com/go/FDI?to=%2Fproducts%2Fcloud-dma',
  skinChanger: 'https://zadeyo.com/products/skin-changer',
  hwidSpoofer: 'https://zadeyo.com/products/hwid-spoofer',
  ugc: 'https://zadeyo.com/products/ugc',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/mw4', CHECKOUT_URLS.mw4],
  ['/go/mw4/', CHECKOUT_URLS.mw4],
  ['/go/mw4', CHECKOUT_URLS.mw4],
  ['/go/mw4/', CHECKOUT_URLS.mw4],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}

/** Merge /go/* query string (e.g. plan=) onto the external checkout URL. */
export function resolveCheckoutRedirect(pathname, search = '') {
  const base = resolveCheckoutPathRedirect(pathname);
  if (!base) return null;

  const raw = search.startsWith('?') ? search.slice(1) : search;
  if (!raw) return base;

  const joiner = base.includes('?') ? '&' : '?';
  return `${base}${joiner}${raw}`;
}
