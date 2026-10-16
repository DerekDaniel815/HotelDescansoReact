import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import LoginModal from './LoginModal'

const links = [
  { to: '/#habitaciones', label: 'Habitaciones', end: true },
  { to: '/reservas', label: 'Reservas' },
  { to: '/huespedes', label: 'Huéspedes' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [year] = useState(() => new Date().getFullYear())

  function openLogin() {
    setMenuOpen(false)
    setLoginOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-40 bg-slate-600 text-white shadow">
        <div className="container-hotel flex min-h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-medium" onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">⌂</span>
            <span>Hotel El Descanso Eterno</span>
          </NavLink>
          <button
            className="rounded p-2 lg:hidden"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `rounded px-3 py-2 hover:bg-slate-700 ${isActive && link.to !== '/#habitaciones' ? 'bg-slate-700' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <button type="button" className="rounded px-3 py-2 hover:bg-slate-700" onClick={openLogin}>
              {authenticated ? 'Mi cuenta' : 'Ingresar'}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="container-hotel space-y-1 border-t border-white/20 py-3 lg:hidden">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="block rounded px-3 py-2 hover:bg-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <button type="button" className="block w-full rounded px-3 py-2 text-left hover:bg-slate-700" onClick={openLogin}>
              {authenticated ? 'Mi cuenta' : 'Ingresar'}
            </button>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {loginOpen && (
        <LoginModal
          authenticated={authenticated}
          onClose={() => setLoginOpen(false)}
          onLogin={() => setAuthenticated(true)}
          onLogout={() => setAuthenticated(false)}
        />
      )}

      <footer className="mt-12 bg-slate-600 py-8 text-white">
        <div className="container-hotel grid gap-5 text-sm md:grid-cols-3 md:items-center">
          <div>
            <p className="font-bold text-amber-300">Hotel El Descanso Eterno</p>
            <p className="text-white/65">San Isidro, Lima — Perú</p>
          </div>
          <div className="text-white/65 md:text-center">(01) 234-5674 · reservas@eldescansoeterno.pe</div>
          <div className="text-white/65 md:text-right">
            Administrado por
            <br />
            <span className="text-amber-300">Grupo 3</span>
          </div>
        </div>
        <div className="container-hotel mt-5 border-t border-white/20 pt-5 text-center text-sm text-white/60 md:text-left">
          © {year} Hotel El Descanso Eterno. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
