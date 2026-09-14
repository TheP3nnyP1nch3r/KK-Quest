Kaitlyn's Quest — v1.3.0
Ashcombe Hall · House Kestrel

DEPLOY (drag and drop)
----------------------
Everything in this folder is the site. Put it in its OWN repo and its OWN
Cloudflare Pages project — do not mix it with Ty's Quest. They use different
storage keys, so even on the same device the two saves never touch.

  index.html            the whole app
  sw.js                 offline cache (bump CACHE when you bump APP_VERSION)
  manifest.webmanifest  installable-to-homescreen config
  three.min.js          3D library
  map.jpg               the splash map
  theme.mp3             the login theme (synth fanfare is the fallback)
  icons/                the 20 hand-drawn pencil icons
  models/               the 3D character (see below)
  models/gear/          24 weapons, loaded only when equipped
  icon-180/192/512.png  the House Kestrel crest
  critters/             the wandering-character cameo sprites

No audio files — the login fanfare is synthesized in code.

3D CHARACTER (models/)
----------------------
  hero.glb        Quaternius Universal Base Characters — Superhero Female,
                  light skin texture, resized and re-encoded
  hair-down.glb   Hair_Long      (shown when her hair is down)
  hair-up.glb     Hair_Buns      (shown with the ponytail setting)
  anims.glb       Quaternius Universal Animation Library, pruned to six clips
                  and stripped to rotation-only channels

v1.3.0 rebuilt all four of these from scratch with a proper glTF toolchain
(@gltf-transform/core) instead of hand-written binary packing, after the
hand-rolled version silently corrupted the character's skin — the body,
eyebrows, and eyes stopped rendering while the code-built clothing (which
isn't skinned) kept showing, which is why only a torso-shaped shell was
visible with no head or limbs. All four files now pass the official
Khronos glTF validator with zero errors, and every bone name in the hair
and animation files was cross-checked against the hero skeleton.

All Quaternius assets are CC0 — free for personal and commercial use, no
attribution required. Credited here anyway because it is the decent thing.

Weapons: the full Quaternius Medieval Weapons pack (CC0) is converted to glTF
and in the loot table from level 3 up. Nothing is forced — if a piece does not
fit the world, just take the other card on the loot screen. Each one is exported
standing up the +Y axis with the handle at the origin; if something sits wrong
in her hand, the three numbers to nudge are marked GRIP in index.html.

Icons: icons/ holds the pencil drawings, mapped to ideas in one place — the
CATICON table and the ic() helper near the top of the script. Change a filename
there and it changes everywhere it appears.

Clip mapping: Idle_Loop (steady) · Sword_Idle (holding something) ·
Idle_Talking_Loop (worn down) · Sitting_Idle_Loop (running on empty) ·
Dance_Loop (level up).

Her clothes are built in code and pinned to the rig — tunic on spine_02,
cloak on spine_01, hood on spine_03, bracers on the forearms, boots on the
feet. To swap in real outfit meshes later, replace rangerKit() in index.html;
nothing else has to change.

WHAT IS DIFFERENT FROM TY'S APP
-------------------------------
Same engine, all new content.

  Attributes   Vigor · Stillness · Devotion · Kinship · Nerve
  Bosses       The Unsaid · The Weathervane · The Long Hallway ·
               The Open Loop · The Quiet Hour
  Season 1     The Hovering Year (eight weeks)
  Companions   Ty and Lawson
  Camp panel   Burn Boot Camp session log (replaces the pickleball panel)
  Loose ends   emails cleared / loose ends closed (replaces the DD numbers)
  Palette      sage, slate, terracotta, neutrals
  Character    built from primitives — light skin, brown curly hair,
               tied-back option, four class paths (Apprentice, Scholar,
               Warden, Herbalist)

SYNC (optional, later)
----------------------
Same Worker recipe as Ty's, with different names so they stay separate:
KV namespace `kk-quest-state`, Worker `kk-quest-sync`, its own secret TOKEN.
Then Night tab -> Sync -> paste the URL and token.

BEFORE SHE SEES IT
------------------
Still open by design: her house colours are set (sage/slate/terracotta) but
the crest, the school and the house name were chosen for her, not with her.
If any of it misses, it is all in one file and easy to change.
