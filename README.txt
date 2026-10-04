Kaitlyn's Quest 5.0.0   (Ashcombe Hall, House Kestrel)

Her own app: its own repo, its own Cloudflare project, its own save. Nothing here depends on
Ty's repo at run time.

DEPLOY (GitHub website upload)
1. Extract the zip. Open the extracted folder.
2. In her repository, upload the CONTENTS of that folder (index.html must land at the repo
   root; do not upload the zip itself or a wrapper folder). The package is well under GitHub's
   100-file upload limit.
3. Delete files from older releases that are no longer used: the whole assets/ folder
   (the sprites and scenes now live inside pixel-assets.js and hero-scenes.js) and
   worker/README.md. Leaving them is harmless but wastes space.
4. Let Cloudflare Pages finish deploying, then reopen the app. Her progress is untouched.

WHAT IS IN THE FOLDER
  index.html            the app
  pixel-core.js         which outfits, weapons and companions exist, and how rewards are offered
  pixel-ui.js           draws the character
  pixel.css             character styling
  pixel-assets.js       every character sprite, packed as images inside one script
  hero-scenes.js        the sixteen hero backgrounds, packed the same way
  sw.js                 offline cache (its name changes every release so devices refresh)
  manifest.webmanifest, icon-*.png      install-to-home-screen
  map.jpg, bg-map2.jpg, theme.mp3       title screen and page background
  icons/, critters/     pencil icons and the wandering visitors
  worker/               optional cloud sync for her save (see worker/SETUP.md)

SAVE AND SYNC
- Her save lives in the browser under the key liferpg:kk:v1. That key must never change.
- Cloud sync uses her own Worker (worker/SETUP.md). The app refuses to sync with a save that
  is not hers, so it can never overwrite Ty's cloud save.
- The Together tab (shared calendar) uses the household Worker; paste its URL and token there.

KEEPING UP WITH TY
The app is generated: Ty's engine + everything hers. Her content, wording and art choices
live in the build tools, not in this folder. To catch up with a newer Ty: give the build tools
and Ty's new repo zip to Claude and ask for a rebuild.
