'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './login/login.module.css'

type Identity = { id: string; name: string; role: string }

/** 渲染登录后占位页面，并在刷新时恢复服务会话。 */
export default function ProtectedPage({ title }: { title: string }) {
  const router = useRouter(); const [identity, setIdentity] = useState<Identity | null>(null); const [status, setStatus] = useState('正在验证登录状态…')
  useEffect(() => { fetch('/api/auth/me', { credentials: 'same-origin' }).then(async (response) => { if (!response.ok) throw new Error('未登录'); return response.json() as Promise<Identity> }).then(setIdentity).catch(() => router.replace('/login')).finally(() => setStatus('')) }, [router])
  async function logout() { await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }); router.replace('/login') }
  if (!identity) return <main className={styles.page}><section className={styles.card}><p>{status}</p></section></main>
  return <main className={styles.page}><section className={styles.card}><p className={styles.brand}>卓工协会 · 学习管理系统</p><h1>{title}</h1><p>你好，{identity.name}。</p><p>当前身份：{identity.role}</p><button type="button" className={styles.submit} onClick={logout}>退出登录</button></section></main>
}
