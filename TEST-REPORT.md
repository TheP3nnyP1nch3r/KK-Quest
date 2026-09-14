# KK’s Quest v3.0.0 — test report

Tested locally on September 14, 2026. Nothing was published, pushed to GitHub, or connected to a live Worker.

## Source and scope

Inspected both supplied project folders and located the corresponding release ZIPs: `kk_quest_v2.0.0.zip` and `tys_quest_v5_0_0.zip`. KK’s ZIP `index.html` matched the supplied KK folder byte-for-byte. KK’s app is the implementation base. Ty’s ZIP supplies only the pixel model/UI/CSS reference and artwork; its Kaitlyn profile, commitments, attributes, quests and sync profile switch were not transplanted.

The first reference folder path moved during inspection; the v5.0.0 ZIP remained available and was used to populate the reference files. Existing document instructions were treated as reference material, not authorization to deploy.

Final byte comparisons passed for all 37 supplied reference asset files and 62 retained KK asset files. Source comparisons also confirmed unchanged ATTRS, COMMITS, CLASSES, COMP, LIFT_TIERS, WG and SEASONS datasets.

No actual exported personal save was supplied. Migration tests used synthetic saves constructed in **KK’s real save schema**; they do not certify a particular device’s stored progress.

## Browser integration — 30 checks passed

Executed against the actual app in Codex’s browser at localhost, with a temporary fixture harness that is excluded from the release ZIP. Tests wrote only disposable localhost state and used mocked network responses for cloud scenarios.

- Fresh female character, Apprentice default and no Ty profile switch.
- Main and family artwork loaded; every catalog asset returned successfully.
- Exact pre-migration JSON backup and no later overwrite of that backup.
- XP, all five KK attributes, class, skill ownership, skill points, custom quests, legacy inventory and Ty/Lawson bond/XP preservation.
- Family summaries read the saved Ty bond, without creating a new KK bond.
- Matching legacy items unlocked; unmatched items archived.
- Pending original vector reward survives migration and can be claimed.
- Pending original 3D reward can be claimed and archived.
- Exact offered pixel IDs persist through refresh.
- Level 3 offers all four pets; levels 3/13/23/33 ultimately yield four distinct owned pets.
- Pet ownership persists in state and the selected pet equips separately.
- Equipment changes leave the gameplay class unchanged; optional slots can be emptied.
- A separate Ty local-storage sentinel remains untouched.
- Ty-format saves are rejected by the KK validator.
- A foreign cloud response blocks subsequent pushes and leaves KK state intact.
- A newer valid KK cloud response pulls successfully with pixel state.
- Storage-write failure reports failure instead of falsely reporting success.
- Crossing multiple class milestones queues them in order.
- An actual XP award produces skill points and pixel rewards without generating new legacy offers.
- Level-10 specials reference the supplied sword/paddle assets.
- Save download controls are installed; CSS is loaded and positions layers correctly.

Download control presence was tested. End-to-end download-file contents were not separately inspected; current/backup JSON serialization and backup bytes were checked in the app. Import validation was tested through the same validator used by the paste-save control, not a full clipboard interaction.

## Model, Worker and offline tests — passed

Run these from the extracted app directory with Node:

```sh
node tests/pixel-core.test.cjs
node tests/service-worker.test.cjs
node tests/worker.test.cjs
```

The model test checks pure migration without gameplay-field mutation, all four KK class starters, legacy mapping/archive, deterministic saved offers, milestone pets, level-10 choices, duplicate prevention, permanent ownership, optional-slot removal and class independence.

The service-worker test checks all 74 precached resources exist, cache cleanup is limited to `kkquest-` caches, offline HTML and pixel-art fallback work, navigation fallback works, and a missing offline asset returns 503 instead of HTML. It exercises the Worker script using mocked Cache APIs; it is not a physical airplane-mode device test.

The sync-Worker test checks authorization failure, empty-state response, malformed-envelope rejection, save round trip, 30-day previous-version TTL and CORS preflight using an in-memory KV mock. Live Cloudflare latency, KV consistency, authentication setup and multiple real devices were not tested. The existing sync contract and last-write semantics remain.

JavaScript syntax checks passed for the main app script, pixel scripts and service worker.

## Visual review

Inspected the desktop layout and a 390 × 844 phone viewport. The female Battlemage, wolf, family portraits, class/outfit labels and surrounding KK layout rendered correctly. Phone document width was 390 pixels with no horizontal overflow; its character stage was 310 pixels high. Collection locked silhouettes and responsive rules come from the reference stylesheet.

Reduced-motion CSS was inspected: it disables the pixel rig, pet and Lawson animations. A real OS preference toggle was not exercised. No per-frame animation was added; all new motion is whole-layer CSS movement. The level-10 special style reuses existing art.

## Material behavior notes

The update deliberately corrects an original KK bug: header/review/season family summaries referenced `comp.kk`, while KK’s actual family cards use `comp.ty` and `comp.lawson`. They now use Ty and Lawson without changing saved bond values. Any preexisting extra `comp.kk` data remains stored. Family-bond season progress now follows the correct people.

Original KK skill headings that displayed `undefined` now use KK’s attribute names. The wardrobe skill’s description reflects free cosmetic swapping; its vitality benefit is retained.

Existing DD-named counters and some inherited labels were already present in KK v2.0.0 and are retained. This release does not redesign the existing habit/session tracking. Normal day rollover, penalties, seasons and sync conflict behavior are still KK’s original systems.

The remaining deployment task is selecting/provisioning KK’s dedicated Worker/KV/URL. The app cannot infer ownership of an empty cloud endpoint, and two tokens on one Worker do not create independent progress.

## GitHub upload package — 91 files

Use `kk_quest_v3_0_0_github.zip` instead of the earlier 114-file package. Extract the outer ZIP only, then upload its contents at KK’s existing app root. Keep `legacy-3d-gear.zip` zipped: it contains the 24 retired 3D gear models for archival completeness and is not needed by the active pixel renderer. Do not expand that inner archive into the upload. All active pixel images and original artwork references remain individual files. Existing `models/gear/` files already in the repository may remain; no deletion is needed.

The outer archive contains exactly 91 files, below 100. App behavior and save format are unchanged from the tested v3.0.0 release.
