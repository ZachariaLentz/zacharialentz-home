export default async function handler(_req, res) {
  res.setHeader('Set-Cookie', 'zl_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  res.status(302).setHeader('Location', '/login').end();
}
