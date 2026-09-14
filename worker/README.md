# KK’s independent save Worker

Use a **new Worker and new KV namespace**, separate from Ty’s. One Worker stores one current save under `save`. A second profile, token or site URL does not partition that KV record.

1. In Cloudflare, create a KV namespace named `kk-quest-state`.
2. Create a Worker named `kk-quest-sync` and deploy the included `worker.js` as its module entry point.
3. Bind the new namespace to the Worker using binding name `STATE`.
4. Add a secret named `TOKEN` with a long unique random value. Do not commit it or paste it into the source.
5. Deploy/save the Worker configuration. Copy its HTTPS workers.dev URL.
6. In the updated KK app’s Sync panel, paste that URL and token. Start with the device containing the correct KK save, then connect the other updated devices.

If using Wrangler, replace the placeholder KV ID in `wrangler.toml` with the ID of the **new KK namespace**, set the TOKEN secret, then deploy this Worker directory. Do not reuse Ty’s namespace ID. No Worker was deployed for this release.

The API remains `GET /state` and `PUT /state` with Bearer authorization and JSON `{t, s}`. Current state is at KV key `save`. Each overwritten previous value is retained at `save:<timestamp>` for 30 days; there is no fixed ten-version cap. Those records contain the envelope: copy its `s` object (not the entire `{t,s}` envelope) when restoring through the app’s paste-save control.

This retains the original last-write behavior and KV semantics. It does not provide conflict merging or atomic concurrent edits. Prefer one device at a time.
