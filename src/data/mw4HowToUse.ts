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
      ],
    },
  ] satisfies Mw4HowToSection[],
  outro: 'Read the status line after a patch before you treat a night of 6v6 as settled.',
};
