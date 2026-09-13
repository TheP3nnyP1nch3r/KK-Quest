Kaitlyn's Quest — v1.0.0
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
  icon-180/192/512.png  the House Kestrel crest
  critters/             the wandering-character cameo sprites

No model files and no audio files. The 3D character, every piece of her gear,
and the login fanfare are all generated in code.

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
