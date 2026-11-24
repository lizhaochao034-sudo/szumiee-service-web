import { type NextRequest } from 'next/server'
import { forwardAuth } from '../_backend'

/** 转发服务平台登录请求并保留服务会话 Cookie。 */
export async function POST(request: NextRequest) {
  try { return await forwardAuth(request, 'login', { method: 'POST', body: await request.text(), headers: { 'Content-Type': request.headers.get('content-type') ?? 'application/json' } }) }
  catch { return Response.json({ code: 'AUTH_UNAVAILABLE' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }) }
}
