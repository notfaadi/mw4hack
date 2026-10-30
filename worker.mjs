import { resolveCheckoutRedirect } from './src/config/checkout-redirects.mjs';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const destination = resolveCheckoutRedirect(url.pathname, url.search);
    if (destination) {
      return Response.redirect(destination, 302);
    }
    return env.ASSETS.fetch(request);
  },
};
