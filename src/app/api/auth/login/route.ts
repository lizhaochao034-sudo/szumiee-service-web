/** 在真实认证网关接入前，统一返回服务不可用，不读取登录凭据。 */
export function POST() {
  return Response.json({ code: 'AUTH_UNAVAILABLE' }, {
    status: 503,
    headers: { 'Cache-Control': 'no-store' },
  })
}
