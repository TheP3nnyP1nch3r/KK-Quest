# Replace KK’s Quest with v4.0.0

Use this ZIP only in **KK’s existing repository and deployment branch**. Nothing in this package was published or connected to GitHub.

## 1. Back up KK’s current progress

1. Open the currently deployed KK app. In **Extras** or the existing save section, use **Copy save code** and save the complete JSON as `kk-before-v4.json` outside the repository. Record her visible level and XP.
2. If cloud sync is enabled, confirm its URL uses KK’s own Worker and KV namespace. Disconnect it before the update if ownership is uncertain. A second token on Ty’s Worker still shares that Worker’s one saved state.
3. Close other KK tabs and devices until the replacement is verified. Keep the same site URL and browser profile because local progress belongs to that browser origin.
4. Download the current repository ZIP or record the current commit so the release can be rolled back.

## 2. Replace the GitHub files

Extract the outer `kk_quest_v4_0_0_github.zip`. Its contents are the app root; `index.html` must remain at the same path as KK’s current `index.html`.

### Recommended: local clone

1. Open KK’s local clone and verify its remote and deployment branch. Pull the latest version and resolve any existing local changes.
2. Copy every extracted file and folder into the directory containing KK’s `index.html`, replacing same-named files and merging folders. Preserve `.git`, `.github`, `CNAME`, and any repository-specific hosting files.
3. Keep `legacy-3d-gear.zip` compressed. Do not expand it into the repository; the outer package is 97 files and the retired models inside that archive are not used by the active character renderer.
4. Review the diff. The shared visual update is mainly in `index.html`, `pixel-ui.js`, `pixel.css`, `sw.js`, `bg-map2.jpg`, and `assets/pixel/`. KK’s storage identity and personal game tables remain hers.
5. Commit and push to **KK’s** configured deployment branch when you choose to publish. A suitable message is `Update KK Quest to v4.0.0`.

### GitHub website upload

Open KK’s repository at its deployment branch. Navigate to the folder containing `index.html`, choose **Add file → Upload files**, and drag in the **contents** of the extracted folder. Commit the replacements. Do not upload a wrapper folder or the outer ZIP itself. The package contains 97 files, below GitHub’s 100-file web-upload limit.

The app root should include:

```text
index.html                  pixel-core.js             pixel-ui.js
pixel.css                   sw.js                     manifest.webmanifest
bg-map2.jpg                 map.jpg                   theme.mp3
assets/pixel/               icons/                    critters/
models/                     artwork-references/       worker/
legacy-3d-gear.zip          tests/                    README.txt
REPLACEMENT-INSTRUCTIONS.md TEST-REPORT.md
```

This static app has no build step. Replacing the `worker/` source in the repository does not deploy a Cloudflare Worker.

## 3. Verify the deployed app

1. Wait for the existing hosting deployment, then reopen KK’s original URL. If the old UI remains, reload once; v4 uses cache `kkquest-v4.0.0`. Do not clear site data.
2. Confirm the footer says **Kaitlyn’s Quest · Ashcombe Hall · v4.0.0** and that her previous XP, gameplay class, skills, inventory, custom quests, relationships and season are present.
3. Confirm the entry tap plays `theme.mp3`. On Hero, confirm the female character, current gameplay class, separate outfit label, illustrated stage and collapsed **Equipped gear & collection** drawer.
4. Open the drawer. Confirm owned equipment remains owned and can be swapped without changing gameplay class. Postponed loot should show the same saved offer after a reload.
5. At level 10 or above, an equipped pet uses its adult artwork. Pet unlock choices remain at levels 3, 13, 23 and 33.
6. Check Today and Plan for the reordered quest layout, repeat selector, quick tomorrow field and collapsible sections. Check a phone-sized view for horizontal overflow.
7. In Extras, download the current save and the pre-update backup. A new install with no earlier save will not have a migration backup.
8. Reopen other KK devices only after the primary device is verified and updated.

If the deployed URL changed, paste the full `kk-before-v4.json` contents into KK’s import control. The validator rejects Ty-format saves.

## 4. Independent KK sync

If KK already has a dedicated working Worker/KV, keep its current URL and token. Otherwise follow `worker/README.md` and `worker/SETUP.md` to create a Worker and KV namespace used only by KK, bind it as `STATE`, and set a unique `TOKEN` secret. Keep that token out of GitHub.

Connect the primary device containing the verified KK save first. Then connect other updated devices. Sync uses newer-timestamp-wins behavior and does not merge simultaneous edits.

## 5. Roll back

Disconnect sync and close other devices. Revert the v4 commit, change the rollback service-worker cache name if necessary, and wait for hosting to redeploy. Restore `kk-before-v4.json` through KK’s paste-save control. Keep any newer v4 export separately in case you return to this release.

