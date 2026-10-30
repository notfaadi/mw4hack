import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['mw4-map-hack-setup', 'mw4-lite-vs-pro', 'mw4-zoom-hack-guide', 'ricochet-patch-day-checklist'],
  pro: [
    'mw4-scripts-ranked-mmr',
    'mw4-auto-combo-hero-scripts',
    'mw4-lite-vs-pro',
    'mw4-stream-proof-setup',
  ],
  elite: [
    'mw4-elite-tier-guide',
    'mw4-cheats-features-guide',
    'mw4-map-hack-setup',
    'ricochet-patch-day-checklist',
    'how-to-buy-mw4-cheats-2026',
  ],
  'hwid-spoofer': [
    'mw4-hwid-spoofer-after-ban',
    'ricochet-verification-errors',
    'ricochet-patch-day-checklist',
    'mw4-external-cheat-guide',
  ],
  ugc: [
    'ricochet-verification-errors',
    'mw4-hwid-spoofer-after-ban',
    'how-to-buy-mw4-cheats-2026',
  ],
  'skin-changer': [
    'mw4-skin-changer-guide',
    'mw4-cheats-features-guide',
    'mw4-stream-proof-setup',
  ],
  'cloud-dma': [
    'mw4-external-cheat-guide',
    'ricochet-patch-day-checklist',
    'how-to-buy-mw4-cheats-2026',
  ],
};

const productBase = '/products/mw4-cheats/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on localhost:4321 and Discord #status before purchase—especially after a Modern Warfare 4 or Ricochet update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite MW4 cheats or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Battle.net platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in a lobby, load presets, then queue Multiplayer or Hardpoint.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Modern Warfare 4 and Ricochet receive frequent updates. Confirm module availability on the live status panel at localhost:4321 before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in Modern Warfare 4 can violate Activision Terms of Use and lead to Ricochet bans or account action. You use this software at your own risk. Compatibility and availability can change after game, Ricochet, or Windows updates without notice.';

const mw4SystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current Modern Warfare 4 client via Battle.net with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Modern Warfare 4 published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/mw4-wallhack.png`,
    alt: 'Modern Warfare 4 wallhack showing enemy player positions and equipment locations',
    caption: 'Wallhack awareness',
    captionDesc: 'Enemy position tracking, equipment ESP and killstreak timers during a Multiplayer hardpoint push.',
  },
  gpScripts: {
    src: `${gameplay}/mw4-aimbot.png`,
    alt: 'Modern Warfare 4 aimbot assist landing an SMG burst on target',
    caption: 'Aimbot assist',
    captionDesc: 'SMG burst with recoil control and visibility checks before lock-on.',
  },
  gpZoomHack: {
    src: `${gameplay}/mw4-fov.png`,
    alt: 'Modern Warfare 4 FOV expander extended camera view of the map',
    caption: 'Extended FOV',
    captionDesc: 'FOV expander showing wider angles for safer rotations and flank detection.',
  },
  gpSkinChanger: {
    src: `${gameplay}/mw4-unlock-all.png`,
    alt: 'Modern Warfare 4 skin changer previewing weapon camo on operator',
    caption: 'Skin Changer preview',
    captionDesc: 'Local blueprint and operator skin preview via skin changer—client-side only.',
  },
  gpAutoKill: {
    src: `${gameplay}/mw4-auto-lethal.png`,
    alt: 'Modern Warfare 4 Auto Kill Steal finishing a low HP enemy at range',
    caption: 'Auto Kill Steal',
    captionDesc: 'Lethal threshold detection firing at the last safe moment in a gunfight.',
  },
  gpFarmBot: {
    src: `${gameplay}/mw4-xp-bot.png`,
    alt: 'Modern Warfare 4 Auto XP Bot clearing patrol routes efficiently',
    caption: 'Auto XP Bot',
    captionDesc: 'Patrol pathing with XP timers and loadout manager for faster leveling.',
  },
  gpHeroEsp: {
    src: `${gameplay}/mw4-player-esp.png`,
    alt: 'Modern Warfare 4 player ESP with name tags and distance readouts',
    caption: 'Player ESP overlay',
    captionDesc: 'Player name tags, team colors and distance markers through smoke and cover.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'mw4-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Modern Warfare 4 Lite is built for players who want map awareness first. In Multiplayer, knowing enemy positions, equipment placements and killstreak timings wins more fights than raw mechanics—Lite gives you that edge without aim automation.',
    },
    { type: 'h2', text: 'Multiplayer-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot assist and bot modules entirely. Your gameplay looks natural while wallhack, FOV expander and killstreak timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Modern Warfare 4 Pro is the sweet spot for Multiplayer grinders. Aimbot assist, Recoil control and Smart fire help you win gunfights without obvious bot patterns—when you tune Delay Setting using our portal presets.',
    },
    { type: 'h2', text: 'Aim assist + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds aim assist, target priority, trigger logic, and hitbox visualization. You see the fight before it starts and win it with settings that stay human at default presets.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Modern Warfare 4 Elite is the private build for players who want everything—Auto XP Bot, Auto Kill Steal, Auto Lethal, Skin Changer, full wallhack and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first Multiplayer queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, equipment locator, killstreak timers, FOV expander, and stream-safe overlay hiding. Config presets for Multiplayer and Warzone ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aim automation' },
    {
      type: 'p',
      text: 'Aim assist, recoil control, smart fire with prediction, target priority, and trigger modules with reaction delays. Delay sliders tune timing so aim stays natural in Multiplayer. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at MW4 Hacks—enough firepower for high-SBMM lobbies without Elite slot limits. Pair with our aimbot guide in the blog before your first Multiplayer session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Auto XP Bot, Lane Control AI, Auto Kill Steal, Auto Lethal, Skin Changer and full wallhack with smoke alerts. Use lobby testing before Multiplayer—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh Activision accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only Ricochet cases; see [UGC](/products/mw4-cheats/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative cheat profile before Multiplayer. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Activision restrictions, Ricochet bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some Ricochet bans cannot be reversed. UGC organizes evidence and follow-ups for Activision review. Pair with [HWID Spoofer](/products/mw4-cheats/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'cloud-dma': [
    { type: 'h2', text: 'What Cloud DMA is' },
    {
      type: 'p',
      text: 'Cloud DMA routes memory reads through a hosted DMA stack so your Battle.net PC does not run traditional injected loaders. You still need compatible hardware and network stability—use the portal compatibility scan before purchase.',
    },
    { type: 'h2', text: 'Pair with MW4 tools' },
    {
      type: 'p',
      text: 'Many operators pair Cloud DMA with external overlays from Elite or utilities like [HWID Spoofer](/products/mw4-cheats/hwid-spoofer/) after hardware recovery. Check Discord #status and the live banner on localhost:4321 before your first Modern Warfare 4 session.',
    },
  ],
  'skin-changer': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Skin Changer ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpMapHack', 'gpZoomHack'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'Player ESP & player boxes',
      'Equipment & sentry locator',
      'Patrol route awareness',
      'Ability cooldown tracking',
      'Tactical radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Killstreak spawn timers',
      'FOV expander',
      'Hardpoint preset config',
      'Multiplayer preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Built around a clear Modern Warfare 4 awareness workflow',
      paragraphs: [
        'Modern Warfare 4 Lite focuses on player ESP, equipment locator, killstreak timers and FOV expander—everything you need to track flanks and map control without script automation. Modules are grouped in the portal so you can tune distance, colors, and stream-proof mode before your first queue.',
        'Lite is the entry path for Multiplayer and Warzone players who want map awareness with minimal report risk. No Aimbot assist, no bots—just readable overlays maintained every patch at localhost:4321.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpMapHack', 'gpHeroEsp'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'All Lite ESP & wallhack modules',
      'Aimbot assist scripts',
      'Recoil control',
      'Smart fire & Prediction',
      'Target Selector',
      'Activator (BKB/Hex/Orchid)',
      'Auto Heal',
      'Ability radius drawing',
      'Delay Setting tuning',
      'Hero-specific script profiles',
      'Smoke alert integration',
      'Multiplayer-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'Built around a clear Modern Warfare 4 scripts workflow',
      paragraphs: [
        'Modern Warfare 4 Pro adds Aimbot assist, Recoil control, Smart fire and Activator on top of every Lite module. Hero profiles, delay tuning and activation keys live in one scripts tab—tuned for Multiplayer lobbies when you start with portal presets, not max sliders.',
        'Pro is the most popular tier: enough firepower for Multiplayer and Warzone without Elite slot limits. Target Selector and Activator keep you efficient mid-fight while scripts stay human at default settings.',
      ],
    },
  },
  elite: {
    images: slide('gpAutoKill', 'gpFarmBot', 'gpSkinChanger'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Auto XP Bot',
      'Lane Control AI',
      'Stack timer',
      'Auto Courier Manager',
      'Auto Kill Steal',
      'Auto Lethal',
      'Full wallhack suite',
      'Smoke alert system',
      'Vision detector',
      'Skin Changer',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'Built around a full Modern Warfare 4 operator workflow',
      paragraphs: [
        'Modern Warfare 4 Elite is the private build with Auto XP Bot, Auto Kill Steal, Auto Lethal, Skin Changer, full wallhack and priority patch delivery. Every Lite and Pro module is included—no caps, no upsells inside the loader.',
        'Elite slots are limited so patch cycles stay fast and builds stay maintainable. Direct dev support in Discord helps you tune conservative profiles before Multiplayer. Check the status banner on localhost:4321 before purchase.',
      ],
    },
  },
  'cloud-dma': {
    images: slide('gpMapHack', 'gpHeroEsp', 'gpZoomHack'),
    goodToKnow:
      'Confirm DMA hardware compatibility and network latency in the portal before checkout. Cloud DMA is not a substitute for Activision account hygiene—follow setup docs step by step.',
    limitations:
      'Requires supported DMA hardware and a stable connection. Not available in all regions. Does not bypass Ricochet on its own—combine with conservative profiles and status checks.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit on your gaming PC.' },
      { icon: 'reqWifi', text: 'Stable low-latency internet for cloud DMA sessions.' },
      { icon: 'reqCpu', text: 'Compatible DMA hardware per portal compatibility list.' },
      { icon: 'reqShieldGuide', text: 'Complete portal setup and verification before launching Modern Warfare 4.' },
    ],
    fullFeatures: [
      'Cloud DMA session routing',
      'Portal dashboard & live status',
      'Config backup and restore',
      'Patch-day alignment notices',
      'Compatibility scan workflow',
      'Latency and link health checks',
      'Discord operator onboarding',
      'Hardware qualification guide',
      'Session logging for support',
      'Linked HWID utility shortcuts',
      'Firmware update notifications',
      'Multi-PC profile sync',
    ],
    overview: {
      title: 'Built around remote DMA for Modern Warfare 4',
      paragraphs: [
        'Cloud DMA keeps heavy read paths off your local Modern Warfare 4 machine while you manage profiles, status, and updates from the operator portal—aimed at players who want hardware-grade reads with a cleaner local footprint.',
        'Setup walks through hardware checks, portal activation, and first-session verification with Discord ops. Pair with Elite or utilities only after you confirm the live status banner on localhost:4321.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpMapHack', 'gpHeroEsp', 'gpZoomHack'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Modern Warfare 4.',
    limitations:
      'Spoofing does not help account-only Ricochet cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Modern Warfare 4 after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'Built around a clear hardware recovery workflow',
      paragraphs: [
        'The HWID Spoofer helps Modern Warfare 4 players recover when Ricochet flags PC hardware but the Activision account is still clean. Disk and MAC profile tools ship with a restore-point checklist, compatibility scan, and post-spoof verification steps.',
        'Use this path when fresh accounts fail instantly on one machine but work elsewhere—not for account-only Ricochet cases. After spoof, load a conservative cheat profile from localhost:4321 before queuing Multiplayer.',
      ],
    },
  },
  ugc: {
    images: slide('gpMapHack', 'gpHeroEsp', 'gpZoomHack'),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent Ricochet bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on localhost:4321 or at checkout on localhost:4321.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'Built around account recovery and appeal workflows',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you recover restricted gaming, social and marketplace accounts with structured appeal workflows and automation—not instant unban guarantees.',
        'Build custom dispute paths, track case status and rebuild your presence with smart restriction-management tools. Support walks you through each step via Discord when you need hands-on help.',
      ],
    },
  },
  'skin-changer': {
    images: slide('gpSkinChanger', 'gpHeroEsp', 'gpMapHack'),
    goodToKnow:
      'Skin Changer previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify Battle.net inventory or store state. Other players cannot see previewed blueprints or sets.',
    systemRequirements: mw4SystemRequirements,
    fullFeatures: [
      'Weapon camo swap',
      'Arcana & immortal preview',
      'Weapon & effect customizer',
      'Loading screen editor',
      'Cursor & HUD theme',
      'Equipment & loadout replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Built around a local skin changer workflow',
      paragraphs: [
        'Skin Changer lets you browse weapon blueprints, operator skins and exclusive sets locally in Modern Warfare 4—searchable catalog, favorites, and loadout export without modifying live store purchases.',
        'Cosmetics display on your client for testing and content creation. Other players see your actual inventory, not preview skins. Included free with Elite; available standalone for cosmetic preview without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.name === 'Lite' ? 'Modern Warfare 4 Lite' : cheat.name === 'Pro' ? 'Modern Warfare 4 Pro' : 'Modern Warfare 4 Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpScripts', 'gpAutoKill', 'gpFarmBot');

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Elite MW4 cheats, Cloud DMA, HWID spoofer, UGC recovery, and cosmetic utilities for Modern Warfare 4 on PC.',
  buyUrl: checkoutPath('mw4'),
};
