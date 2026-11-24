'use client'

import { useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { getRoleDestination } from './login-contract'
import styles from './login.module.css'

/** 渲染账号密码表单，并按服务端返回的当前身份导航。 */
export default function LoginForm() {
  const router = useRouter(); const submitting = useRef(false)
  const [passwordVisible, setPasswordVisible] = useState(false); const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState({ username: '', password: '', form: '' })
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (submitting.current) return
    const form = event.currentTarget; const data = new FormData(form); const username = String(data.get('username') ?? '').trim(); const password = String(data.get('password') ?? '')
    const validation = { username: username ? '' : '请输入用户名', password: password ? '' : '请输入密码', form: '' }; setErrors(validation)
    if (validation.username || validation.password) { form.querySelector<HTMLInputElement>(validation.username ? '#username' : '#password')?.focus(); return }
    submitting.current = true; setPending(true); let navigating = false
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ username, password }) })
      if (!response.ok) { setErrors({ ...validation, form: response.status === 401 ? '账号或密码错误' : response.status === 503 ? '登录服务暂不可用，请稍后重试。' : '登录失败，请稍后重试。' }); return }
      const destination = getRoleDestination(await response.json().catch(() => null)); if (!destination) { setErrors({ ...validation, form: '暂时无法确认登录身份，请联系培训部管理员。' }); return }
      router.replace(destination); navigating = true
    } catch { setErrors({ ...validation, form: '登录请求失败，请检查网络后重试。' }) }
    finally { if (!navigating) { submitting.current = false; setPending(false) } }
  }
  return <form method="post" action="/api/auth/login" noValidate onSubmit={handleSubmit} aria-busy={pending}>
    <div className={styles.field}><label htmlFor="username">用户名</label><input id="username" name="username" autoComplete="username" placeholder="请输入用户名" required readOnly={pending} aria-invalid={!!errors.username} aria-describedby={errors.username ? 'username-error' : undefined} onChange={() => setErrors((value) => ({ ...value, username: '', form: '' }))} />{errors.username && <p id="username-error" className={styles.error}>{errors.username}</p>}</div>
    <div className={styles.field}><label htmlFor="password">密码</label><div className={styles.password}><input id="password" name="password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" placeholder="请输入密码" required readOnly={pending} aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-error' : undefined} onChange={() => setErrors((value) => ({ ...value, password: '', form: '' }))} /><button type="button" className={styles.toggle} aria-controls="password" aria-label={passwordVisible ? '隐藏密码' : '显示密码'} onClick={() => setPasswordVisible(!passwordVisible)}><span aria-hidden="true" className={passwordVisible ? styles.eye : [styles.eye, styles.eyeClosed].join(' ')} /></button></div>{errors.password && <p id="password-error" className={styles.error}>{errors.password}</p>}</div>
    <p className={styles.error} role="alert">{errors.form}</p><button type="submit" className={styles.submit} disabled={pending}>{pending ? '登录中…' : '登录'}</button>
  </form>
}
