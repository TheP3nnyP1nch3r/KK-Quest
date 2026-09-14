// KK’s Quest sync — one user, one KV key. Deploy as its own Worker.
// Bindings: KV namespace STATE. Secret: TOKEN.
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '*';
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Max-Age': '86400',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(req.url);
    if (url.pathname !== '/state') return new Response('KK Quest sync', { headers: cors });
    const auth = req.headers.get('Authorization') || '';
    if (auth !== 'Bearer ' + env.TOKEN) return new Response('nope', { status: 401, headers: cors });
    if (req.method === 'GET') {
      const v = await env.STATE.get('save');
      if (!v) return new Response('empty', { status: 404, headers: cors });
      return new Response(v, { headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    }
    if (req.method === 'PUT') {
      const body = await req.text();
      if (body.length > 2_000_000) return new Response('too big', { status: 413, headers: cors });
      let parsed; try { parsed = JSON.parse(body) } catch { return new Response('bad json', { status: 400, headers: cors }) }
      if (!parsed || typeof parsed.t !== 'number' || !parsed.s) return new Response('bad shape', { status: 400, headers: cors });
      // keep the last 10 versions as a safety net
      const prev = await env.STATE.get('save');
      if (prev) await env.STATE.put('save:' + Date.now(), prev, { expirationTtl: 60 * 60 * 24 * 30 });
      await env.STATE.put('save', body);
      return new Response('ok', { headers: cors });
    }
    return new Response('method', { status: 405, headers: cors });
  }
};
