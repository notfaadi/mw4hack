import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutRedirect } from './config/checkout-redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  const requestUrl = new URL(context.request.url);
  const destination = resolveCheckoutRedirect(requestUrl.pathname, requestUrl.search);
  if (destination) {
    return context.redirect(destination, 302);
  }
  return next();
});
