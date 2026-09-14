# Replace KK’s Quest with v3.0.0

This ZIP updates **KK’s existing repository**. Do not upload it to Ty’s repository or replace Ty’s app. No repository URL or deployment branch was supplied, so those two existing project settings must be selected by you.

## 1. Protect the current progress

1. In the existing KK app, use **Night → Copy save code** (the existing export control) and paste the complete JSON into a text file named `kk-before-v3.json`. Keep it outside the repository. Record her level and XP.
2. If sync is enabled, confirm that its URL belongs to KK’s own Worker and that its KV namespace is separate from Ty’s. If unsure, disconnect sync before updating. A different token on Ty’s Worker does not create a separate save.
3. Keep the same deployed hostname, protocol and browser profile. Browser saves are tied to the origin. Do not clear site data, uninstall the app, reset the hero or change its save key. GitHub file replacement itself does not remove browser storage.
4. Download the existing repository ZIP or note the current commit for rollback. Close other KK tabs/devices during the update so old code does not write over a newer save.

## 2. Replace repository files

Unzip `kk_quest_v3_0_0_github.zip` (outer ZIP only). Its contents are the app root: `index.html` must stay at the same path where KK’s current `index.html` lives, not one folder deeper.

For an existing local clone (recommended for folder uploads):

1. Open **KK’s** clone in Finder and verify its Git remote and deployment branch. Switch to that branch and pull its current contents using your normal Git client. Resolve any existing local work before replacing files.
2. Copy **all contents of the extracted ZIP** into the directory containing KK’s existing `index.html`, replacing same-named files and merging folders. Keep `.git`, `.github`, any custom `CNAME`, and your existing hosting configuration. Do not copy a ZIP as a substitute for its extracted files. No old asset deletion is required.
3. Inspect the diff. The changed runtime files are `index.html`, `sw.js`, and the new `pixel-core.js`, `pixel-ui.js`, `pixel.css`, `assets/pixel/`. Worker labels/configuration are corrected under `worker/`. Reference artwork, documentation and tests are included. KK’s manifest, icons, map, theme music and original assets remain.
4. Commit with a message such as `Update KK Quest to v3.0.0 pixel character system`, then push to KK’s configured deployment branch when you are ready to publish. These are instructions for you; no push was performed by this task.

For GitHub’s website: open KK’s repository on its deployment branch, navigate to the directory containing `index.html`, choose **Add file → Upload files**, and drag the extracted files/folders there. Commit the replacements. If the browser rejects the upload size or file count, use the local-clone method above rather than omitting assets. Uploading a nested wrapper folder will break the existing site paths.

After replacement, the app root must contain:

```text
index.html
pixel-core.js
pixel-ui.js
pixel.css
sw.js
manifest.webmanifest
assets/pixel/                 all supplied PNGs and supporting asset files
artwork-references/           original supplied reference material
icons/  critters/  models/    retained KK assets
icon-180.png  icon-192.png  icon-512.png
map.jpg  theme.mp3  three.min.js
worker/                      separate optional cloud service; see below
```

The static app has no build step. Preserve the repository’s existing hosting/deploy integration. Replacing `worker/` files in the site repository does **not** deploy a Worker by itself.

## 3. Verify the deployed replacement

1. Wait for your existing hosting deployment to finish, then reopen KK’s app at its original URL. Reload once more if the version still shows v2.0.0; the new cache is `kkquest-v3.0.0`. Do not clear storage as a cache fix.
2. Confirm **Kaitlyn’s Quest · Ashcombe Hall · v3.0.0**, her previous XP, skills, class and family bonds. Normal existing day-rollover behavior still runs; testing migration does not suspend daily gameplay.
3. On Hero, confirm female artwork, the Collection book, and the class shown separately from the outfit. Existing pending legacy offers appear first; additional cosmetic offers catch up to the current level.
4. In Night, download the current save and the pre-update backup. The automatic backup is made before the first legacy-save migration. A fresh install with no old save has no pre-update backup.
5. Equip an owned item, reload, and verify that it stays equipped. Reopen rewards and confirm the same offer remains if you postponed it.
6. Reopen other KK devices only after the primary device is verified. Update each before resuming play.

If the URL changed, import the saved **KK JSON** using Night’s paste-save control. Downloaded JSON files are restored by opening the file, copying its full contents and using that control; there is no file-picker import. Ty-format saves are rejected.

## 4. Independent KK cloud progress

If KK already has a dedicated working Worker/KV, preserve her current URL/token. Otherwise follow `worker/README.md` to create `kk-quest-sync` and a new `kk-quest-state` KV namespace, bind it as `STATE`, and set a unique `TOKEN` secret. Keep the token out of GitHub.

Connect the primary device with the verified KK save first, then other updated devices. An empty Worker receives the primary device’s next save. Existing sync semantics remain: a newer cloud timestamp wins on pull; changes are pushed after about 1.5 seconds. This is not a merging or simultaneous-editing system. Failed pushes retry on a later change, not through a new background retry service.

The app blocks a pull and subsequent pushes if the endpoint returns a save with a non-KK attribute schema. It cannot prove that an empty endpoint is dedicated to KK; verify the Worker and KV yourself. **Do not point KK at Ty’s URL even temporarily.**

## 5. Rollback

Disconnect sync and close other devices. Revert the update commit using your Git client and let your existing hosting deployment finish. Use a new cache version in the rollback `sw.js` if needed so devices receive the reverted files. Restore `kk-before-v3.json` through the original app’s paste-save control. Keep the newer exported save separately if you may return to v3. Migration never converts KK’s gameplay fields into Ty’s schema.

## KK-specific decisions

Routine decisions are already implemented: female default; themed starter outfit by existing class; freely swappable cosmetics; retroactive cosmetic offers; Ty’s family portrait uses the supplied male art; Lawson uses permanent art; unmatched items stay archived. No gameplay or relationship wording choice is waiting. The remaining setup choice is the actual dedicated KK Worker/KV/URL, which cannot be provisioned without your cloud account and was not requested as a deployment.

Family-summary correction: the original header/review/season code referenced an extra `kk` bond. These now read the existing `ty` bond, matching KK’s Ty/Lawson family cards. Stored bonds are unchanged; any old extra `comp.kk` field is retained but no longer used. Family-bond season progress consequently reflects Ty and Lawson.

## GitHub upload package — 91 files

Use `kk_quest_v3_0_0_github.zip` instead of the earlier 114-file package. Extract the outer ZIP only, then upload its contents at KK’s existing app root. Keep `legacy-3d-gear.zip` zipped: it contains the 24 retired 3D gear models for archival completeness and is not needed by the active pixel renderer. Do not expand that inner archive into the upload. All active pixel images and original artwork references remain individual files. Existing `models/gear/` files already in the repository may remain; no deletion is needed.

The outer archive contains exactly 91 files, below 100. App behavior and save format are unchanged from the tested v3.0.0 release.
