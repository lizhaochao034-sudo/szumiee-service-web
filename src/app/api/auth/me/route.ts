import { type NextRequest } from 'next/server'
import { forwardAuth } from '../_backend'

/** 转发当前服务会话查询。 */
export async function GET(request: NextRequest) {
  try { return await forwardAuth(request, 'me', { method: 'GET' }) }
  catch { return Response.json({ code: 'AUTH_UNAVAILABLE' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }) }
}
