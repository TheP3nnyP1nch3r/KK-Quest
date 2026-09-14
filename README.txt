KK’s Quest — v3.0.0
Kaitlyn / Ashcombe Hall

This is an update of KK’s original v2.0.0 app, not Ty’s Kaitlyn profile.
Open REPLACEMENT-INSTRUCTIONS.md before replacing the deployed app.
See TEST-REPORT.md for verified behavior and limits.

New: female-default layered pixel character; Ranger, Knight, Battlemage and
Trailkeeper outfits; modular headwear, tools/weapons, offhand and collectible
pets; permanent ownership; collection silhouettes; refresh-safe reward offers;
Lawson’s permanent artwork; download current save and pre-update backup.

KK’s Apprentice, Scholar, Warden and Herbalist classes remain gameplay classes.
Initial cosmetics match their theme, but changing outfits never changes class.
Existing players receive cosmetic reward choices for levels already reached.
Pets are offered at levels 3, 13, 23, 33; level 10 offers gold-styled sword/paddle.
Choose later postpones the modal; use Hero → Check/Open rewards to resume.
Pending old rewards are honored first. Unmatched legacy items remain archived.

KK’s original gameplay, quests, family text, XP formulas, attributes, skill
benefits, inventory, and sync envelope are retained. Original DD-related code
already in KK v2.0.0 remains; no Ty commitments or DD code were imported.
The existing skill-label display bug is fixed. Wardrobe skill text now explains
that cosmetics are freely swappable; the skill’s vitality benefit is unchanged.

Save key: liferpg:kk:v1 (unchanged)
Sync settings: liferpg:kk:sync (unchanged)
Pre-update backup: liferpg:kk:v1:pre-pixel-v3 (first legacy save, immutable)
Pixel additions live in save.pixel and travel through the same KK sync flow.
Never use Ty’s Worker or KV for KK. One Worker stores one current save.

Artwork is supplied reference artwork, not newly generated. Motion translates
or rotates whole layers. There are no new walking, attacking or wing-flap frames.
Reduced-motion CSS disables pixel movement. Old 3D files are retained for archive
completeness, but the new character view does not initialize the 3D renderer.

Node tests, from this folder:
  node tests/pixel-core.test.cjs
  node tests/service-worker.test.cjs
  node tests/worker.test.cjs

No GitHub, deployment or live cloud action was performed for this release.

Family-summary correction: the original header/review/season code referenced an extra `kk` bond. These now read the existing `ty` bond, matching KK’s Ty/Lawson family cards. Stored bonds are unchanged; any old extra `comp.kk` field is retained but no longer used. Family-bond season progress consequently reflects Ty and Lawson.

## GitHub upload package — 91 files

Use `kk_quest_v3_0_0_github.zip` instead of the earlier 114-file package. Extract the outer ZIP only, then upload its contents at KK’s existing app root. Keep `legacy-3d-gear.zip` zipped: it contains the 24 retired 3D gear models for archival completeness and is not needed by the active pixel renderer. Do not expand that inner archive into the upload. All active pixel images and original artwork references remain individual files. Existing `models/gear/` files already in the repository may remain; no deletion is needed.

The outer archive contains exactly 91 files, below 100. App behavior and save format are unchanged from the tested v3.0.0 release.
