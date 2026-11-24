const destinations = {
  student: '/today',
  ta: '/ta/attention',
  mgmt: '/mgmt/students',
} as const

/**
 * 将服务端返回的当前登录身份映射到平台内部入口。
 *
 * @param result 已通过认证的响应数据。
 * @returns 已知身份的入口路径。无法识别身份时返回 null。
 */
export function getRoleDestination(result: unknown): string | null {
  if (typeof result !== 'object' || result === null || !('role' in result)) return null
  const { role } = result
  if (role === 'student' || role === 'ta' || role === 'mgmt') return destinations[role]
  return null
}
