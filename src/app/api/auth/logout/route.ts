import { type NextRequest } from 'next/server'
import { forwardAuth } from '../_backend'

/** 转发服务会话注销请求。 */
export async function POST(request: NextRequest) {
  try { return await forwardAuth(request, 'logout', { method: 'POST' }) }
  catch { return new Response(null, { status: 503, headers: { 'Cache-Control': 'no-store' } }) }
}
