import type { IconName } from '../components/icons/types';

export const featureIcons: Record<string, IconName> = {
  'Cloud DMA': 'dmaHardware',
  Scripts: 'stepCrosshair',
  'Wallhack / ESP': 'featureEsp',
  'Tactical Radar': 'featureRadar',
  'Aimbot assist': 'featureAimbot',
  'Utility Suite': 'featureUtilitySuite',
  'Auto XP Bot': 'compareAutoFarm',
  'Stream Proof': 'streamProof',
  'FOV Expander': 'compareZoomHack',
  'Cloud Config & Updates': 'compareCloudBackup',
};

export const whyUsIcons: IconName[] = ['whyShield', 'whyUsers', 'whyMonitor', 'whyHeadphones'];

export const setupStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqCheck'];

export const toolkitIcons: Record<string, IconName> = {
  Combat: 'toolkitCombat',
  Vision: 'toolkitVision',
  Radar: 'toolkitRadar',
  Weapons: 'toolkitWeapons',
  Movement: 'toolkitMovement',
  Profiles: 'toolkitProfiles',
};

export const workflowIcons: IconName[] = [
  'workflowAlert',
  'workflowPackage',
  'workflowSettings',
  'workflowCheck',
];

export const fieldNoteIcons: IconName[] = ['fieldCalendar', 'fieldShield', 'fieldHeadphones'];

export const blogTagIcons: Record<string, IconName> = {
  Guides: 'navBlog',
  Setup: 'settings',
  Features: 'layers',
  Updates: 'refresh',
  Troubleshooting: 'alert',
};

/** Homepage hero ticker — large outline pills (full-width marquee). */
export const heroMarqueePills: { icon: IconName; label: string }[] = [
  { icon: 'compareCloudBackup', label: 'Config cloud sync' },
  { icon: 'sidebarHwid', label: 'HWID reset' },
  { icon: 'faqExternalLoader', label: 'External loader' },
  { icon: 'featureAimbot', label: 'Aimbot' },
  { icon: 'softAim', label: 'Silent aimbot' },
  { icon: 'featureEsp', label: 'ESP' },
  { icon: 'mapHack', label: 'Wallhack' },
  { icon: 'noRecoil', label: 'No recoil' },
  { icon: 'undetected', label: 'Undetected' },
  { icon: 'streamProof', label: 'Stream proof' },
  { icon: 'triggerBot', label: 'Trigger bot' },
  { icon: 'featureUtilitySuite', label: 'Menu toggles' },
  { icon: 'support247', label: '24/7 Support' },
  { icon: 'liveStatus', label: 'Live Status' },
  { icon: 'reqWindows', label: 'Windows 10 & 11' },
  { icon: 'seasonBuild', label: 'Modern Warfare 4' },
  { icon: 'whyShield', label: 'Ricochet-aware client' },
  { icon: 'autoUpdates', label: 'Auto updates' },
  { icon: 'radarOnline', label: 'Tactical radar' },
  { icon: 'lootEsp', label: 'Loot ESP' },
];

/** @deprecated Use heroMarqueePills on the homepage ticker. */
export const heroStatusPills = heroMarqueePills;

export const heroStatIcons: IconName[] = [
  'heroStatStream',
  'heroStatClock',
  'heroStatUsers',
  'heroStatHeadphones',
];

export const cheatTierIcons: Record<string, IconName> = {
  Lite: 'tierLite',
  Pro: 'tierPro',
  Elite: 'tierElite',
};

export const productCategoryIcons: Record<string, IconName> = {
  'Core product': 'coreProduct',
  'External suite': 'externalSuite',
  'DMA hardware': 'dmaHardware',
  'System utility': 'systemUtility',
  'Account recovery': 'accountRecovery',
  Cosmetic: 'cosmetic',
};

export const acquisitionStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqZap', 'acqCheck'];

/** After-purchase timeline on product detail — one distinct icon per step */
export const productAcquisitionStepIcons: IconName[] = [
  'liveStatus',
  'acqPackage',
  'headphones',
  'acqCheck',
];

/** Product detail requirement tiles — prefer compat-style icons where mapped */
export const productRequirementIcons: Partial<Record<IconName, IconName>> = {
  reqWindows: 'compatWindows',
  reqSteam: 'compatSteam',
  reqSettings: 'compatPackage',
  reqWifi: 'compatWifi',
  reqCpu: 'compatMonitor',
  reqRestorePoint: 'compatRefresh',
  reqShieldGuide: 'compatShield',
  reqMailOrder: 'mail',
  reqShieldAccount: 'compatShield',
  reqWifiPortal: 'compatWifi',
};

export function requirementDisplayIcon(icon: IconName): IconName {
  return productRequirementIcons[icon] ?? icon;
}

export const compatibilityIcons: IconName[] = [
  'compatWindows',
  'compatPackage',
  'compatSteam',
  'compatMonitor',
  'compatRefresh',
  'compatWifi',
  'compatDiscord',
  'compatShield',
];
