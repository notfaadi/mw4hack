/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    // gscNote: Keep primary keyword "Modern Warfare 4 cheats" near front; trim if title truncates in SERP.
    title: 'Modern Warfare 4 Cheats & Hacks | Aimbot, Wallhack, ESP, Warzone',
    description:
      'MW4 Hacks: Modern Warfare 4 cheats & hacks for PC—aimbot, wallhack, ESP, radar, triggerbot, unlock all, HWID spoofer, Ricochet-aware loader updates, Warzone & Multiplayer tiers worldwide.',
  },
  '/products/mw4-cheats/': {
    title: 'Buy Modern Warfare 4 Cheats | Elite, Pro, Lite & Utilities',
    description:
      'Compare MW4 cheat tiers: aimbot, ESP, wallhack, scripts, unlock all—plus HWID spoofer, UGC, and cosmetic utilities for Battle.net & Steam PC players globally.',
  },
  '/products/mw4-cheats/elite/': {
    title: 'Modern Warfare 4 Elite Cheats | Bots & Full Wallhack',
    description:
      'Elite tier: auto farm bot, kill steal, skin changer, full wallhack suite, and priority patch delivery.',
  },
  '/products/mw4-cheats/utilities/': {
    title: 'Modern Warfare 4 Utilities | HWID, UGC & Skin Changer',
    description:
      'Choose HWID Spoofer, UGC, Cloud DMA, or Skin Changer—when each utility fits and links to full product pages.',
  },
  '/blog/': {
    title: 'Modern Warfare 4 Cheats Guides & Patch Notes',
    description:
      'Setup guides, Lite vs Pro comparisons, Ricochet patch checklists, and Multiplayer config tips for MW4 cheats.',
  },
  '/forum/': {
    title: 'Modern Warfare 4 Community Forum | MW4 Hacks',
    description: 'Join MW4 players to discuss heroes, builds, patch changes, guides, and community moments.',
  },
  '/faq/': {
    title: 'FAQ | Modern Warfare 4 Cheats, Products & Setup',
    description:
      'Answers on cheat tiers, wallhack, scripts, HWID tools, checkout, and blog guides at localhost:4321.',
  },
  '/terms/': {
    title: 'Terms & Conditions | MW4 Hacks',
    description:
      'Purchase terms, license use, and refund policy for MW4 Hacks products sold through localhost:4321.',
  },
  '/privacy/': {
    title: 'Privacy Policy | MW4 Hacks',
    description:
      'How localhost:4321 uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About MW4 Hacks',
    description:
      'What MW4 Hacks publishes: Modern Warfare 4 cheat tiers, utilities, guides, and status notes at localhost:4321.',
  },
  '/support/': {
    title: 'Support | MW4 Hacks',
    description:
      'Get help with loader setup, HWID, and checkout for Modern Warfare 4 cheat tiers and utilities.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
