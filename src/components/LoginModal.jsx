import { useEffect, useState } from 'react'

export default function LoginModal({ authenticated, onClose, onLogin, onLogout }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState(authenticated ? 'Sesión iniciada.' : '')

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function submit(event) {
    event.preventDefault()
    setSubmitted(true)
    if (!username.trim() || !password.trim()) return
    onLogin()
    setMessage('Inicio de sesión simulado correctamente.')
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="modal-panel max-w-[420px]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="login-title" className="text-xl font-bold">Hotel El Descanso Eterno</h2>
          <button type="button" onClick={onClose} className="rounded p-1 text-2xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-800" aria-label="Cerrar">×</button>
        </header>
        <div className="p-6">
          {message && <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">{message}</div>}
          {authenticated ? (
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={() => {
                onLogout()
                setMessage('')
                setUsername('')
                setPassword('')
                setSubmitted(false)
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <form onSubmit={submit}>
              <div className="mb-4">
                <label className="label" htmlFor="username">Usuario</label>
                <input id="username" className="field" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Ingresa tu usuario" autoFocus />
                {submitted && !username.trim() && <p className="error">El usuario es obligatorio.</p>}
              </div>
              <div className="mb-6">
                <label className="label" htmlFor="password">Contraseña</label>
                <input id="password" className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ingresa tu contraseña" />
                {submitted && !password.trim() && <p className="error">La contraseña es obligatoria.</p>}
              </div>
              <button type="submit" className="btn btn-primary w-full">→ Iniciar sesión</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
