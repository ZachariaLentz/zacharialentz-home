async function readBody(req) {
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function parseFormEncoded(input) {
  const params = new URLSearchParams(input);
  return {
    username: params.get('username') ?? '',
    password: params.get('password') ?? '',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const body = await readBody(req);
  const { username, password } = parseFormEncoded(body);

  const expectedUser = process.env.AUTH_USERNAME;
  const expectedPass = process.env.AUTH_PASSWORD;
  const sessionToken = process.env.AUTH_SESSION_TOKEN;

  if (!expectedUser || !expectedPass || !sessionToken) {
    res.status(500).json({ error: 'auth_not_configured' });
    return;
  }

  if (username !== expectedUser || password !== expectedPass) {
    res.status(401).json({ error: 'invalid_credentials' });
    return;
  }

  res.setHeader(
    'Set-Cookie',
    `zl_session=${encodeURIComponent(sessionToken)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
  );
  res.status(302).setHeader('Location', '/').end();
}
