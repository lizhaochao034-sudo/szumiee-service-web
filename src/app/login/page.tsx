import type { Metadata } from 'next'
import LoginForm from './LoginForm'
import styles from './login.module.css'

export const metadata: Metadata = { title: '登录 · 卓工协会服务平台' }

/** 渲染服务平台的居中登录卡片。 */
export default function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <header>
          <p className={styles.brand}>卓工协会 · 学习管理系统</p>
          <h1 id="login-title">登录</h1>
          <p className={styles.intro}>账号由协会统一发放</p>
        </header>
        <LoginForm />
        <p className={styles.hint}>忘记密码请联系培训部管理员。</p>
      </section>
    </main>
  )
}
