KK’s Quest — v4.1.1
Kaitlyn / Ashcombe Hall

This updates KK’s existing app with the shared presentation and character work
from Ty’s Quest v5.6.0. It remains KK’s app and save format. Open
REPLACEMENT-INSTRUCTIONS.md before replacing the deployed files, and see
TEST-REPORT.md for the completed checks and practical limits.

New in v4.1.0 (on top of v4.0.0's Ty v5.6.0 parity work):
- new overall page background (the illustrated parchment border), blended to
  50% opacity onto her parchment colour so panel text stays easy to read
- new hero-stage background (the lit courtyard) behind her pixel character
- melee weapon grip corrected to 70\u00b0 (sword, axe, hammer, paddle) to match
  the angle used on Ty's hero; bow/staff/spear grips are unchanged
- the old Strength block is now a Weigh-in tracker: enter the number from the
  scale, see the change from her last entry, nothing else \u2014 no targets, no
  BMI, no commentary on the number itself. A flat +20xp rewards logging it.
- church check-in now fires only on Sunday; the separate Wednesday devotional
  auto-prompt was removed (the Tuesday devotional reminder chip in the week
  view is untouched, since that's informational, not a forced check-in)
- quest log gained an "Already done \u2014 just logging it" option (+10% xp) next
  to "doing it right now" (+25%), for logging something retroactively
- a wording pass: all five boss encounters and all eighteen season
  descriptions were rewritten in plainer, more direct language, along with
  eight panel-level strings (quest-log placeholder, Bandwidth panel, Her
  People subtitle, camp/check-in subtext, the weekly streak line, and the
  penalty explainer). This is a first pass, not exhaustive \u2014 flag anything
  that still reads as too much and it's a quick follow-up.

KK still starts as the Apprentice gameplay class with female Battlemage artwork
and the Wayfinder staff. Battlemage is cosmetic: outfits and equipment never
change Apprentice, Scholar, Warden or Herbalist. Existing saves keep their saved
class and current equipment. The supplied theme.mp3 plays when the entry screen
is tapped or keyboard-activated.

KK’s attributes, quests, commitments, relationships, routines, birthdays,
seasons, focus definitions, badges, XP, skills, inventory, history and sync
identity are retained. No Ty profile, save key, personal quest table, season,
relationship wording or profile selector was imported. The source has no
separate Enneagram field; no personality value was invented or copied.

Save key: liferpg:kk:v1 (unchanged)
Sync settings: liferpg:kk:sync (unchanged)
Pre-update backup: liferpg:kk:v1:pre-pixel-v3 (unchanged and immutable)

KK needs her own Worker, KV namespace and URL. One Worker stores one current
save; a different token on Ty’s Worker is not an independent save.

v4.1.1 file cleanup (repo was getting close to GitHub's 100-file cap):
- Removed three.min.js and models/*.glb (hero.glb, head.glb, hair-up.glb,
  hood.glb, anims.glb) and legacy-3d-gear.zip. All confirmed unreferenced by
  any executing code path — the 3D character view was fully replaced by the
  pixel system in v4.0.0, but the old assets and about 250 lines of dead
  rendering code (h3codePiece, hero3dSync, h3load, h3rebind, the THREE.js
  scene setup) were still sitting in the repo and, worse, still listed in
  sw.js's precache list, meaning every new visitor downloaded ~3.5MB of code
  that never ran. Two tiny no-op stubs remain (hero3dInit, hero3dLoadModel)
  because two call sites still check for them on pre-pixel saves; they do
  nothing and cost nothing.
- artwork-references/ and tests/ are now single zip files (matching the
  existing legacy-3d-gear.zip pattern) instead of loose files. Unzip either
  if you need to read the design references or run the Node tests locally;
  neither is needed for the deployed app.
- Net effect: 97 files → 84 files, 20MB → 16MB. Nothing user-facing changed;
  every asset now in sw.js's precache list was verified to exist on disk.

This package contains exactly 84 files, well under GitHub's 100-file cap.
No GitHub, deployment or live cloud action was performed.

