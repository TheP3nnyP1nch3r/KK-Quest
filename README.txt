Kaitlyn's Quest — v2.0.0
Ashcombe Hall · House Kestrel

STANDALONE. This is no longer derived from Ty's Quest at deploy time: its own
repo, its own Cloudflare project, its own storage key (liferpg:kk:v1), its own
sync key and worker name. Updating one app can no longer affect the other.

Built from the Ty's Quest v4.3 engine, so everything that accumulated there is
here too: vacation mode, busy-day mode, the seasonal sixth commitment, birthday
and holiday quests, per-season difficulty, the rolling loose-ends view, the
strength block, and the church/devotional check-in.

DEPLOY (Cloudflare Pages -> Upload assets)
------------------------------------------
Upload the CONTENTS of this folder, so index.html sits at the top level.

  index.html            the whole app
  sw.js                 offline cache (bump CACHE with APP_VERSION every deploy)
  manifest.webmanifest  installable to the home screen
  three.min.js          3D library
  map.jpg               title screen art
  theme.mp3             title music
  icons/                20 pencil sketches used as panel motifs
  models/               her 3D character
  models/gear/          24 weapons, fetched only when equipped
  critters/             wandering-character cameos
  worker/               optional cross-device sync (deploy separately)

THE 3D CHARACTER
----------------
  hero.glb      Quaternius Female Ranger outfit — body, arms, legs, boots, belts
  head.glb      head and neck only, taken from the base character and cut at
                y=1.49 so the seam hides under the tunic collar
  hair-up.glb   Hair_Buns, tinted brown
  hood.glb      the ranger hood, equippable at level 3 (hides the hair)
  anims.glb     six clips, rotation-only channels

Why the graft: the Ranger outfit ships with no head, and the only free base
body is a larger build that pushes through the clothes. Head-only avoids that
entirely. Both skin textures were colour-matched so the join is invisible.

All model files pass the Khronos glTF validator with zero errors, and every
bone name is cross-checked across body, head, hair, hood and animations.

Clips: Idle_Loop (steady) / Sword_Idle (holding something) /
Idle_Talking_Loop (worn down) / Sitting_Idle_Loop (empty) / Dance_Loop (level up).

If a weapon sits wrong in her hand, the three numbers to nudge are marked
GRIP in index.html.

STILL TO DO (next pass)
-----------------------
The UI redesign notes are only partly applied so far: the palette is warm
parchment, the title screen is mobile-formatted, and the pencil icons are in
place as panel motifs. Not yet done: the Today-screen priority rewrite,
pulling Settings out of the Night tab, the typography pass, equipped gear
shown beside the hero, and auto-linking one log to every place it counts.
