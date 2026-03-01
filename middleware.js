function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (!k) continue;
    out[k] = decodeURIComponent(rest.join('='));
  }
  return out;
}

export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (
    pathname === '/login' ||
    pathname === '/login.html' ||
    pathname === '/api/auth/login' ||
    pathname === '/api/auth/logout' ||
    pathname === '/favicon.ico'
  ) {
    return;
  }

  const expectedToken = process.env.AUTH_SESSION_TOKEN;
  if (!expectedToken) {
    return new Response('Server auth not configured', { status: 500 });
  }

  const cookies = parseCookies(request.headers.get('cookie'));
  if (cookies.zl_session === expectedToken) {
    return;
  }

  if (pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({ error: 'UNAUTHORIZED' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  return Response.redirect(new URL('/login', request.url), 302);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
