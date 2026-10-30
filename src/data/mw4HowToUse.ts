export interface Mw4HowToSection {
  heading: string;
  paragraphs: string[];
}

export const mw4HowToUse = {
  triggerLabel: 'HOW TO USE MW4',
  gameTitle: 'Modern Warfare 4',
  intro:
    'Modern Warfare 4 came out on October 23, 2026. Most people queuing this month are on the twelve new 6v6 maps, on Ground War around Hajin, or in the DMZ trying to leave with a bag. This listing is the catalog for those modes: aim, player visuals, radar, DMZ loot, trigger, and the usual misc line.',
  sections: [
    {
      heading: 'Aim',
      paragraphs: [
        'The aim stays inside a circle you choose. It eases onto the operator instead of snapping, and it leaves anyone behind a wall alone. Head, upper chest, or closest is a pick. Teammates and downed operators can be left out, and there is a distance cap. On a tight map, upper chest is the setting that still looks like a normal fight. Head bias is for the longer lanes.',
      ],
    },
    {
      heading: 'What you see',
      paragraphs: [
        'A 6v6 round does not need a loot list. The default read is a box, health, armor plates, and distance. Skeleton is there when you want the stance of someone holding an angle. Names stay off unless you turn them on. People you can see and people behind cover use different colors. A snapline and the weapon in hand are optional. The 2D radar is the same information on a small map: operator markers, range, and zoom.',
      ],
    },
    {
      heading: 'Hajin',
      paragraphs: [
        'Ground War is the large Hajin maps. DMZ uses the same region, with contracts, cash, bags, armor, ammo, and an extract. Vehicles are marked on the farmland and the roads in. Leave that layer off when you go back to 6v6.',
      ],
    },
    {
      heading: 'Trigger and the rest',
      paragraphs: [
        'Trigger fires only when the crosshair is already on an operator. It uses a short delay and the same wall check as the aim. It does not move the view. No recoil is a small settle on a rifle, and no spread is the matching label. Save one config for 6v6 and a second for DMZ. Stream-proof keeps the overlay off a capture.',
        'Read the status line after a patch before you treat a night of 6v6 as settled. A build marked maintenance is being rebuilt against the live version and will not attach until it clears. The loader checks the game build first and refuses a mismatch instead of half-loading into a lobby. Patch day costs a few hours, not a week, and the changelog names the line that was touched. If the status says current and the loader still fails, the game build is ahead of the loader and a refresh is the answer, not a reinstall.',
      ],
    },
    {
      heading: 'Setup',
      paragraphs: [
        'Windows 10 and 11, on the Steam and Battle.net builds. Nothing in the game folder is edited, so a patch never leaves a stale file behind and a verify does not wipe the install. TPM 2.0 and Secure Boot both need to be on before the loader will attach, and the setup guide covers the BIOS screens for the usual boards. Download, run the loader, pick a profile, then start the game. Two minutes on a machine that is already configured. Antivirus exclusions go on the loader folder, not the whole drive.',
      ],
    },
    {
      heading: 'Profiles',
      paragraphs: [
        'One config for 6v6 and a second for DMZ is the short version. The longer version is a third for Ground War on Hajin, where the distance cap wants to be higher and the vehicle layer wants to be on. Every value is a slider, every profile saves by name, and a profile loads whole instead of value by value.',
      ],
    },
    {
      heading: 'Undetected',
      paragraphs: [
        'Modern Warfare 4 cheats and hacks here get read against Ricochet, so the defaults are conservative. The aimbot ships with a narrow circle, low smoothing, and the wall check on. Widen the circle when you want the lobby to notice you. The trigger delay sits at 40 ms by default and shares the aim\'s wall check, so a shot never fires through geometry. Stream-proof is one toggle and covers OBS and capture cards. Modern warfare 4 hacks that get flagged are usually running a wide circle with the wall check off in a killcam-heavy lobby.',
      ],
    },
    {
      heading: 'What a flag looks like',
      paragraphs: [
        'A flag is not a ban. The loader shows it on the status line, the account keeps playing, and the spoofer is the tool for after a hardware ID gets read. Run it before the next session, not mid-match. Reinstalling Windows is the long way to the same place. Shadowbans clear on their own after a few days of clean play, and a spoofer keeps the next account off the old signature.',
      ],
    },
    {
      heading: 'Buying',
      paragraphs: [
        'MW4 cheats and hacks ship as a license key by email, usually inside a minute. The key binds to the loader, the loader pulls the current build, and the build updates for the length of the license. Monthly and lifetime are both listed. PayPal and crypto are both accepted. If the key does not arrive, the support channel answers faster than the ticket queue. mw4hacks and cheats bought on a Sunday get the same delivery as a Tuesday.',
      ],
    },
    {
      heading: 'Support',
      paragraphs: [
        'The Discord is the support desk and the changelog lives there too. Screenshots of the status line get an answer in minutes during EU and NA evenings. A refund is for a build that will not attach on a supported machine, not for a night of bad reads.',
      ],
    },
  ] satisfies Mw4HowToSection[],
  closing:
    'Read this page as a catalog, not a promise. The aim is a circle, the visuals are a read, and the radar is the same read on a smaller map. Buy for the modes you actually queue, set the profile for that mode, and leave the rest of the sliders alone until something in a match tells you otherwise. Modern Warfare 4 cheats and hacks reward a boring config more than a clever one.',
};
