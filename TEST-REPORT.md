# KK’s Quest v4.0.0 — test report

Tested locally on September 14, 2026. Nothing was published, pushed to GitHub, or connected to a live Worker.

## Source and separation checks

The working KK v3.0.1 package was used as the base. Ty’s supplied `tys_quest_v5_6_0.zip` was extracted and inspected as the reference for shared visual and interaction changes. Ty’s profile selector and personal gameplay content were not transplanted.

A source-level equality check compared KK v4.0.0 against KK v3.0.1 and passed for 17 personal datasets: attributes, Working Genius multipliers, quest pool, bonus quests, bosses, birthdays, routines, Burn Boot Camp definitions, focus definitions, badges, seasons, extra seasons, relationships, commitments, sixth-slot habits, skills and gameplay classes. The `liferpg:kk:v1` save key and `liferpg:kk:sync` setting key remain present, and no Ty save key exists.

No separate Enneagram field exists in the current KK source or Ty reference. The release therefore does not infer or copy an Enneagram value.

## Browser and responsive checks

The real app was served on localhost and tested in the Codex in-app browser.

- Fresh state rendered Kaitlyn as female with Apprentice gameplay class, Battlemage cosmetic outfit and Wayfinder staff.
- `bg-map2.jpg` rendered behind the app and `assets/pixel/stage-bg.jpg` rendered in the hero stage.
- The footer displayed `Kaitlyn’s Quest · Ashcombe Hall · v4.0.0`.
- Equipped gear, Skills, Burn Boot Camp and Chronicle began collapsed; Attributes began open.
- The equipment drawer opened from its summary and showed class/outfit separation.
- The Collection book showed Dragon, Wolf, Fox and Griffin with level markers 3, 13, 23 and 33.
- The repeat selector offered none, daily, weekly and monthly, and the quick-tomorrow field was present.
- Desktop viewport was 1280 pixels wide. A 390 × 844 phone viewport had a 390-pixel document width, no horizontal overflow and a 310-pixel hero stage.
- The browser console contained no warnings or errors during these checks.
- Entry activation removed the splash and entered the app. The handler references `theme.mp3`; the packaged file is byte-identical to the user-supplied `/Users/tywiles/Downloads/theme.mp3` with SHA-256 `17188cd6cfe896258e438858d931675e6ac985ebac8255c9e8d32b5dee52f135`.

The browser used a fresh localhost save. No actual device export was supplied, so preservation of a particular device’s personal progress must be confirmed after deployment using the backup and visible level/XP checks in the replacement guide.

## Automated checks

These commands passed from the extracted app root:

```sh
node tests/pixel-core.test.cjs
node tests/service-worker.test.cjs
node tests/worker.test.cjs
```

The model test covers gameplay-field preservation, KK starter cosmetics, legacy archive mappings, deterministic saved offers, all four pet milestones, level-10 art, duplicate prevention, permanent ownership, optional-slot removal and gameplay-class independence.

The service-worker test confirmed that all 80 precached resources exist, cache cleanup remains scoped to `kkquest-` caches, HTML and pixel art work from cache, navigation falls back to `index.html`, and a missing offline asset returns 503. It uses mocked Cache APIs rather than physical airplane mode.

The sync Worker test covers authorization failure, empty state, malformed-envelope rejection, save round trip, 30-day previous-version TTL and CORS preflight with an in-memory KV mock. Live Cloudflare latency, KV consistency and real-device concurrency were not tested.

JavaScript syntax checks passed for both inline app scripts, `pixel-core.js`, `pixel-ui.js`, `sw.js` and the module-form sync Worker.

## Asset and package checks

The four adult pet images, new map background and new stage background are individually packaged and precached. Runtime code selects adult pet art at level 10 while ownership and equipment remain unchanged. The animation uses whole image layers; no walking, attack or wing-flap frames were added. Reduced-motion rules remain in `pixel.css`.

The final outer ZIP contains exactly 97 files. `legacy-3d-gear.zip` stays compressed, keeping the package under GitHub’s 100-file browser-upload limit. The completed ZIP was also listed and tested after packaging.

