# Ty's Quest sync — setup (about 5 minutes, all in the Cloudflare dashboard)

This is a second, tiny Worker that only stores your save. It is separate from the site.

## 1. Make the KV namespace
Cloudflare dashboard → Storage & Databases → KV → Create namespace → name it `ty-quest-state`.

## 2. Make the Worker
Workers & Pages → Create → Create Worker → name it `ty-quest-sync` → Deploy (the hello-world is fine).
Then click Edit code, delete everything, paste the contents of `worker.js`, Deploy.

## 3. Bind the KV and set the token
On the Worker → Settings → Bindings → Add → KV namespace:
  Variable name: `STATE`   Namespace: `ty-quest-state`
Settings → Variables and Secrets → Add → type Secret:
  Name: `TOKEN`   Value: a long random password (anything — 30+ characters, you'll paste it into the app once per device)
Deploy / save.

## 4. Connect the app
Copy the Worker URL (looks like `https://ty-quest-sync.<your-subdomain>.workers.dev`).
In Ty's Quest → Night tab → Sync: paste the URL and the token → Save & sync now.
Do that on the phone and on the desktop. Whichever device saved most recently wins.

## How it behaves
- Every change pushes to the cloud about 1.5 seconds after you make it. Fully offline-safe: if the push fails, the local save is still there and the next change retries.
- On open, the app checks the cloud first. If the cloud copy is newer than the local one, it pulls it and tells you.
- The Worker keeps the last 30 days of previous versions in KV (`save:<timestamp>`) as a safety net. If you ever need one, open KV in the dashboard and copy the value into "Paste save code".
- Cloudflare's free tier covers this many times over.

## If you'd rather use wrangler
`wrangler.toml` is included — set the KV id, `wrangler secret put TOKEN`, `wrangler deploy`.
