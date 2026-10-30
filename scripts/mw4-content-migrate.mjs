import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

const SKIP_DIRS = new Set(['node_modules', '.git', '.astro', 'dist', 'public/images']);

const EXT = new Set(['.ts', '.astro', '.mjs', '.md', '.txt', '.json', '.css']);

/** Longest-first phrase replacements for user-facing copy */
const REPLACEMENTS = [
  ['products/dota-2-cheats', 'products/mw4-cheats'],
  ['/dota-2-cheats/', '/mw4-cheats/'],
  ['how-to-use-dota-2-', 'how-to-use-mw4-'],
  ['how-to-buy-dota-2-', 'how-to-buy-mw4-'],
  ['valve-anti-cheat-unable-to-verify', 'ricochet-verification-errors'],
  ['valve-anti-cheat', 'ricochet-anti-cheat'],
  ['vac-patch-day-checklist', 'ricochet-patch-day-checklist'],
  ['dota-2-', 'mw4-'],
  ['dotacheats.com', 'localhost:4321'],
  ['support@dotacheats.com', 'support@mw4hacks.local'],
  ['DotaCheats', 'MW4 Hacks'],
  ['dota cheats', 'MW4 cheats'],
  ['Dota cheats', 'MW4 cheats'],
  ['dota 2 cheats', 'Modern Warfare 4 cheats'],
  ['Dota 2 cheats', 'Modern Warfare 4 cheats'],
  ['dota 2 cheat', 'Modern Warfare 4 cheat'],
  ['Dota 2 cheat', 'Modern Warfare 4 cheat'],
  ['dota 2', 'Modern Warfare 4'],
  ['Dota 2', 'Modern Warfare 4'],
  ['dota cheats', 'MW4 cheats'],
  ['Third-party dota', 'Third-party MW4'],
  ['third-party dota', 'third-party MW4'],
  ['Valve Anti-Cheat', 'Ricochet anti-cheat'],
  ['Valve-approved', 'Developer-approved'],
  ['Valve', 'Activision'],
  ['VAC ', 'Ricochet '],
  ['VAC,', 'Ricochet,'],
  ['Steam Dota', 'Battle.net Modern Warfare 4'],
  ['Steam Modern Warfare', 'Battle.net Modern Warfare'],
  ['via Steam', 'via Battle.net'],
  ['Steam on Windows', 'Battle.net on Windows'],
  ['Steam account', 'Activision account'],
  ['Steam client', 'Battle.net client'],
  ['launch Steam', 'launch Battle.net'],
  ['Launch Steam', 'Launch Battle.net'],
  ['MMR', 'SBMM rank'],
  ['ranked and Turbo', 'Multiplayer and Warzone'],
  ['Ranked and Turbo', 'Multiplayer and Warzone'],
  ['Turbo lobby', 'Hardpoint lobby'],
  ['Turbo', 'Hardpoint'],
  ['Turbo-friendly', 'Hardpoint-friendly'],
  ['ranked queue', 'Multiplayer queue'],
  ['ranked lobbies', 'Multiplayer lobbies'],
  ['ranked lobby', 'Multiplayer lobby'],
  ['ranked session', 'Multiplayer session'],
  ['ranked goals', 'Multiplayer goals'],
  ['ranked grinders', 'Multiplayer grinders'],
  ['ranked-safe', 'Multiplayer-safe'],
  ['Ranked-safe', 'Multiplayer-safe'],
  ['queue ranked', 'queue Multiplayer'],
  ['queuing ranked', 'queuing Multiplayer'],
  ['Ranked', 'Multiplayer'],
  ['ranked', 'Multiplayer'],
  ['map hack', 'wallhack'],
  ['Map hack', 'Wallhack'],
  ['Map Hack', 'Wallhack'],
  ['map awareness', 'map awareness'],
  ['hero ESP', 'player ESP'],
  ['Hero ESP', 'Player ESP'],
  ['hero scripts', 'weapon loadout macros'],
  ['Hero scripts', 'Weapon loadout macros'],
  ['hero combos', 'gunfight combos'],
  ['Hero combos', 'Gunfight combos'],
  ['Auto Combo', 'Aimbot assist'],
  ['Auto Farm Bot', 'Auto XP Bot'],
  ['Auto Dagon', 'Auto Lethal'],
  ['Orbwalker', 'Recoil control'],
  ['Smart Cast', 'Smart fire'],
  ['ward ESP', 'equipment ESP'],
  ['Ward ', 'Equipment '],
  ['ward ', 'equipment '],
  ['wards', 'equipment'],
  ['Wards', 'Equipment'],
  ['rune timers', 'killstreak timers'],
  ['Rune ', 'Killstreak '],
  ['Invoker', 'SMG loadout'],
  ['Lion', 'Sniper loadout'],
  ['Phantom Assassin', 'Marksman loadout'],
  ['PA ', 'Marksman '],
  ['minimap hack', 'tactical radar'],
  ['Minimap', 'Tactical map'],
  ['minimap', 'tactical map'],
  ['zoom hack', 'FOV expander'],
  ['Zoom hack', 'FOV expander'],
  ['Zoom Hack', 'FOV Expander'],
  ['Skin Changer', 'Unlock All'],
  ['skin changer', 'Unlock All'],
  ['arcanas', 'blueprints'],
  ['immortals', 'operator skins'],
  ['hero skin', 'weapon camo'],
  ['Hero skin', 'Weapon camo'],
  ['hero boxes', 'player boxes'],
  ['bot lobby', 'Private Match'],
  ['bot lobbies', 'Private Matches'],
  ['custom lobby', 'Private Match'],
  ['custom lobbies', 'Private Matches'],
  ['practice lobby', 'Private Match'],
  ['practice lobbies', 'Private Matches'],
  ['ganks', 'flanks'],
  ['teamfight', 'gunfight'],
  ['teamfights', 'gunfights'],
  ['mid push', 'hardpoint push'],
  ['Jungle camp', 'Patrol route'],
  ['jungle camp', 'patrol route'],
  ['Jungle pathing', 'Patrol pathing'],
  ['jungle pathing', 'patrol pathing'],
  ['courier', 'loadout'],
  ['fog of war', 'visibility'],
  ['ancient', 'objective'],
  ['Dota players', 'MW4 players'],
  ['dota players', 'MW4 players'],
  ['@dotacheats', '@mw4hacks'],
  ["dota2", "mw4"],
  ["'dota2'", "'mw4'"],
  ['/go/dota-2/', '/go/mw4/'],
  ['/go/dota-2', '/go/mw4'],
  ['dota-2', 'mw4'],
  ['dotaSystemRequirements', 'mw4SystemRequirements'],
  ['dotacheats-forum-vote:', 'mw4hacks-forum-vote:'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(root, full);
    if (SKIP_DIRS.has(name) || rel.startsWith(`scripts${path.sep}mw4-content-migrate`)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(name)) && !rel.includes('package-lock.json')) files.push(full);
  }
  return files;
}

function migrateFile(file) {
  if (file.endsWith(`${path.sep}src${path.sep}data${path.sep}blog${path.sep}posts.ts`)) return;
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of REPLACEMENTS) {
    next = next.split(from).join(to);
  }
  next = next.replace(/\/images\/blog\/mw4-/g, '/images/blog/dota-2-');
  next = next.replace(/\/images\/gameplay\/mw4-/g, '/images/gameplay/dota-2-');
  if (next !== text) fs.writeFileSync(file, next, 'utf8');
}

const files = walk(root);
for (const file of files) migrateFile(file);
console.log(`Migrated ${files.length} files (excluding posts.ts).`);
