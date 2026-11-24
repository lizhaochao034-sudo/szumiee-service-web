import type { NextRequest } from 'next/server'

const backendUrl = process.env.SERVICE_API_URL ?? 'http://127.0.0.1:8002'

/** 把浏览器同源认证请求转发到服务平台 API。 */
export async function forwardAuth(request: NextRequest, path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers)
  const cookie = request.headers.get('cookie')
  const origin = request.headers.get('origin')
  if (cookie) headers.set('cookie', cookie)
  if (origin) headers.set('origin', origin)
  const response = await fetch(backendUrl + '/api/auth/' + path, { ...init, headers, cache: 'no-store' })
  const resultHeaders = new Headers({ 'Cache-Control': 'no-store' })
  const contentType = response.headers.get('content-type')
  const setCookie = response.headers.get('set-cookie')
  if (contentType) resultHeaders.set('content-type', contentType)
  if (setCookie) resultHeaders.set('set-cookie', setCookie)
  return new Response(response.body, { status: response.status, headers: resultHeaders })
}
