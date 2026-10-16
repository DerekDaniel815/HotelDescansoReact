import { useEffect, useState } from 'react'
import { useHotel } from '../context/useHotel'

const emptyGuest = { name: '', paternal: '', maternal: '', dni: '', phone: '', email: '' }

function errorsFor(guest) {
  const errors = {}
  if (guest.name.trim().length < 3) errors.name = 'Mínimo 3 caracteres.'
  if (guest.paternal.trim().length < 3) errors.paternal = 'Campo obligatorio.'
  if (guest.maternal.trim().length < 3) errors.maternal = 'Campo obligatorio.'
  if (!/^\d{8}$/.test(guest.dni)) errors.dni = 'Debe tener 8 dígitos.'
  if (!/^\d{9}$/.test(guest.phone)) errors.phone = 'Debe tener 9 dígitos.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) errors.email = 'Ingresa un correo válido.'
  return errors
}

export default function Guests() {
  const { guests, saveGuest } = useHotel()
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState(emptyGuest)
  const [editingId, setEditingId] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const errors = errorsFor(form)

  useEffect(() => {
    if (!modal) return undefined
    function onKey(event) {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modal])

  function close() {
    setModal(null)
    setForm(emptyGuest)
    setSubmitted(false)
  }

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function save(event) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    setNotice(saveGuest({ ...form, id: editingId }))
    close()
  }

  return (
    <section className="container-hotel my-12">
      {notice && (
        <div className="mb-5 flex justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <span>✓ {notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="Cerrar alerta">×</button>
        </div>
      )}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <h1 className="section-title mb-0">♙ Huéspedes registrados</h1>
        <button type="button" className="btn btn-primary" onClick={() => { setEditingId(null); setForm(emptyGuest); setSubmitted(false); setModal('new') }}>＋ Nuevo Huésped</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guests.map((guest) => (
          <article key={guest.id} className="card relative p-5">
            <div className="flex items-center gap-3 pr-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{guest.name[0]}{guest.paternal[0]}</div>
              <div>
                <h2 className="font-bold">{guest.name} {guest.paternal} {guest.maternal}</h2>
                <p className="text-sm text-slate-500">▣ {guest.dni}</p>
                <p className="text-sm text-slate-500">☎ {guest.phone}</p>
                <p className="break-all text-sm text-slate-500">✉ {guest.email}</p>
              </div>
              <button
                type="button"
                className="absolute right-4 top-4 rounded border border-blue-500 px-2.5 py-1 text-blue-600 hover:bg-blue-50"
                aria-label={`Editar a ${guest.name}`}
                onClick={() => {
                  setEditingId(guest.id)
                  setForm({ name: guest.name, paternal: guest.paternal, maternal: guest.maternal, dni: guest.dni, phone: guest.phone, email: guest.email })
                  setSubmitted(false)
                  setModal('edit')
                }}
              >
                ✎
              </button>
            </div>
            <footer className="mt-4 flex justify-between border-t border-slate-200 pt-3">
              <span className="badge bg-emerald-100 text-emerald-800">{guest.status}</span>
              <small className="text-slate-500">ID: {guest.id}</small>
            </footer>
          </article>
        ))}
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={close} role="presentation">
          <section className="modal-panel" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="guest-title">
            <header className="flex items-center justify-between bg-blue-600 p-5 text-white">
              <h2 id="guest-title" className="text-xl font-semibold">{modal === 'new' ? 'Registrar Huésped' : 'Editar Huésped'}</h2>
              <button type="button" onClick={close} className="text-2xl" aria-label="Cerrar">×</button>
            </header>
            <form onSubmit={save}>
              <div className="grid gap-4 p-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="label" htmlFor="name">Nombres *</label>
                  <input id="name" className="field" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Nombres completos" />
                  {submitted && errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="paternal">Apellido paterno *</label>
                  <input id="paternal" className="field" value={form.paternal} onChange={(event) => update('paternal', event.target.value)} />
                  {submitted && errors.paternal && <p className="error">{errors.paternal}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="maternal">Apellido materno *</label>
                  <input id="maternal" className="field" value={form.maternal} onChange={(event) => update('maternal', event.target.value)} />
                  {submitted && errors.maternal && <p className="error">{errors.maternal}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="dni">DNI *</label>
                  <input id="dni" className="field" value={form.dni} maxLength="8" inputMode="numeric" onChange={(event) => update('dni', event.target.value.replace(/\D/g, '').slice(0, 8))} />
                  {submitted && errors.dni && <p className="error">{errors.dni}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="phone">Teléfono *</label>
                  <input id="phone" className="field" value={form.phone} maxLength="9" inputMode="numeric" onChange={(event) => update('phone', event.target.value.replace(/\D/g, '').slice(0, 9))} />
                  {submitted && errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="label" htmlFor="email">Correo electrónico *</label>
                  <input id="email" className="field" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="ejemplo@correo.com" />
                  {submitted && errors.email && <p className="error">{errors.email}</p>}
                </div>
              </div>
              <footer className="flex justify-end gap-2 border-t border-slate-200 p-4">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancelar</button>
                <button className="btn btn-primary">{modal === 'new' ? 'Registrar huésped' : 'Guardar cambios'}</button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </section>
  )
}
