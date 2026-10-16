import { useEffect, useMemo, useState } from 'react'
import { formatDate, money, nightsBetween, rooms } from '../data'
import { useHotel } from '../context/useHotel'

const emptyForm = { guest: '', roomId: '0', status: 'Confirmada', entry: '', exit: '', observations: '' }

export default function Reservations() {
  const { reservations, guestNames, saveReservation, cancelReservation } = useHotel()
  const [guestFilter, setGuestFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!modal) return undefined
    function onKey(event) {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modal])

  const filtered = useMemo(() => reservations.filter((item) =>
    item.guest.toLowerCase().includes(guestFilter.toLowerCase())
    && (!statusFilter || item.status === statusFilter)
    && (!typeFilter || item.type === typeFilter),
  ), [reservations, guestFilter, statusFilter, typeFilter])

  const nights = nightsBetween(form.entry, form.exit)
  const room = rooms.find((item) => item.id === Number(form.roomId))
  const total = nights * (room?.price ?? 0)
  const invalid = !form.guest || !room || nights < 1

  function close() {
    setModal(null)
    setSubmitted(false)
  }

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function openNew() {
    setSelectedId(null)
    setForm(emptyForm)
    setSubmitted(false)
    setModal('new')
  }

  function openEdit(item) {
    const match = rooms.find((value) => value.number === item.room)
    setSelectedId(item.id)
    setForm({
      guest: item.guest,
      roomId: String(match?.id ?? 0),
      status: item.status === 'Anulada' ? 'Pendiente' : item.status,
      entry: item.entry,
      exit: item.exit,
      observations: '',
    })
    setSubmitted(false)
    setModal('edit')
  }

  function save(event) {
    event.preventDefault()
    setSubmitted(true)
    if (invalid) return
    setNotice(saveReservation({
      id: selectedId,
      guest: form.guest,
      room: room.number,
      type: room.type,
      entry: form.entry,
      exit: form.exit,
      nights,
      total,
      status: modal === 'new' ? 'Confirmada' : form.status,
      price: room.price,
    }))
    close()
  }

  function confirmCancel(event) {
    event.preventDefault()
    setNotice(cancelReservation(selectedId))
    setReason('')
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="section-title mb-0">▣ Listado de Reservas</h1>
        <button type="button" className="btn btn-primary" onClick={openNew}>＋ Nueva Reserva</button>
      </div>
      <div className="mb-5 grid gap-2 md:grid-cols-12">
        <input className="field md:col-span-4" placeholder="Buscar por huésped..." value={guestFilter} onChange={(event) => setGuestFilter(event.target.value)} />
        <select className="field md:col-span-3" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="">Todos los estados</option>
          <option>Pendiente</option>
          <option>Confirmada</option>
          <option>Anulada</option>
        </select>
        <select className="field md:col-span-3" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="">Todos los tipos</option>
          <option>Simple</option>
          <option>Doble</option>
          <option>Pet-friendly</option>
        </select>
        <button type="button" className="btn btn-outline md:col-span-2" onClick={() => { setGuestFilter(''); setStatusFilter(''); setTypeFilter('') }}>× Limpiar</button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[850px] border-collapse text-left text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              {['#', 'Huésped', 'Habitación', 'Entrada', 'Salida', 'Noches', 'Total', 'Estado', 'Acciones'].map((heading) => (
                <th key={heading} className="p-3 font-semibold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.length === 0 && (
              <tr><td colSpan="9" className="p-8 text-center text-slate-500">No hay reservas que coincidan con los filtros.</td></tr>
            )}
            {filtered.map((item, index) => (
              <tr key={item.id} className={`hover:bg-blue-50 ${index % 2 === 0 ? 'bg-slate-50' : ''}`}>
                <td className="p-3 text-slate-500">#{item.id}</td>
                <td className="p-3">{item.guest}</td>
                <td className="p-3">{item.room} — {item.type}</td>
                <td className="p-3">{formatDate(item.entry)}</td>
                <td className="p-3">{formatDate(item.exit)}</td>
                <td className="p-3">{item.nights}</td>
                <td className="p-3 font-bold">{money(item.total)}</td>
                <td className="p-3">
                  <span className={`badge ${item.status === 'Confirmada' ? 'bg-emerald-100 text-emerald-800' : item.status === 'Anulada' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{item.status}</span>
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button type="button" className="rounded border border-blue-400 px-2 py-1 text-blue-600 disabled:opacity-40" disabled={item.status === 'Anulada'} onClick={() => openEdit(item)} aria-label="Editar">✎</button>
                    <button type="button" className="rounded border border-red-400 px-2 py-1 text-red-600 disabled:opacity-40" disabled={item.status === 'Anulada'} onClick={() => { setSelectedId(item.id); setReason(''); setModal('cancel') }} aria-label="Anular">×</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(modal === 'new' || modal === 'edit') && (
        <div className="modal-backdrop" onClick={close} role="presentation">
          <section className="modal-panel max-w-3xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="reservation-title">
            <header className="flex items-center justify-between bg-blue-600 p-5 text-white">
              <h2 id="reservation-title" className="text-xl font-semibold">{modal === 'new' ? 'Nueva Reserva' : `Editar Reserva #${selectedId}`}</h2>
              <button type="button" onClick={close} className="text-2xl" aria-label="Cerrar">×</button>
            </header>
            <form onSubmit={save}>
              <div className="grid gap-4 p-5 md:grid-cols-2">
                <div>
                  <label className="label" htmlFor="guest">Huésped *</label>
                  <select id="guest" className="field" value={form.guest} onChange={(event) => update('guest', event.target.value)}>
                    <option value="">Seleccionar huésped...</option>
                    {guestNames.map((name) => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="room">Habitación disponible *</label>
                  <select id="room" className="field" value={form.roomId} onChange={(event) => update('roomId', event.target.value)}>
                    <option value="0">Seleccionar habitación...</option>
                    {rooms.map((item) => <option key={item.id} value={item.id}>{item.number} — {item.type} — S/ {item.price}</option>)}
                  </select>
                </div>
                {modal === 'edit' && (
                  <div>
                    <label className="label" htmlFor="status">Estado *</label>
                    <select id="status" className="field" value={form.status} onChange={(event) => update('status', event.target.value)}>
                      <option>Pendiente</option>
                      <option>Confirmada</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="label" htmlFor="entry">Fecha de entrada *</label>
                  <input id="entry" className="field" type="date" value={form.entry} onChange={(event) => update('entry', event.target.value)} />
                </div>
                <div>
                  <label className="label" htmlFor="exit">Fecha de salida *</label>
                  <input id="exit" className="field" type="date" value={form.exit} onChange={(event) => update('exit', event.target.value)} />
                  {submitted && form.exit && nights < 1 && <p className="error">La salida debe ser posterior a la entrada.</p>}
                </div>
                <div>
                  <label className="label">N° noches</label>
                  <input className="field bg-slate-100" readOnly value={nights} />
                </div>
                <div>
                  <label className="label">Total a pagar</label>
                  <input className="field bg-slate-100 font-bold text-emerald-700" readOnly value={money(total)} />
                </div>
                <div className="md:col-span-2">
                  <label className="label" htmlFor="observations">Observaciones</label>
                  <textarea id="observations" className="field" rows="2" value={form.observations} onChange={(event) => update('observations', event.target.value)} placeholder="Ej: llegada tardía, cama adicional..." />
                </div>
                {submitted && invalid && <p className="error md:col-span-2">Completa todos los campos obligatorios.</p>}
              </div>
              <footer className="flex justify-end gap-2 border-t border-slate-200 p-4">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancelar</button>
                <button className="btn btn-primary">{modal === 'new' ? 'Confirmar Reserva' : 'Guardar cambios'}</button>
              </footer>
            </form>
          </section>
        </div>
      )}

      {modal === 'cancel' && (
        <div className="modal-backdrop" onClick={close} role="presentation">
          <section className="modal-panel" onClick={(event) => event.stopPropagation()} role="alertdialog" aria-modal="true">
            <header className="flex justify-between bg-red-600 p-5 text-white">
              <h2 className="text-xl font-semibold">⚠ Anular Reserva</h2>
              <button type="button" onClick={close} className="text-2xl" aria-label="Cerrar">×</button>
            </header>
            <form onSubmit={confirmCancel}>
              <div className="p-5">
                <div className="rounded-lg bg-amber-50 p-4 text-amber-900">El estado cambiará a <strong>Anulada</strong>. Esta acción no se puede deshacer.</div>
                <p className="my-4">Reserva: <strong>#{selectedId}</strong></p>
                <label className="label" htmlFor="reason">Motivo de anulación</label>
                <select id="reason" className="field" value={reason} onChange={(event) => setReason(event.target.value)}>
                  <option value="">Sin motivo específico</option>
                  <option>Solicitud del huésped</option>
                  <option>Error en la reserva</option>
                  <option>Fuerza mayor</option>
                  <option>Otro</option>
                </select>
              </div>
              <footer className="flex justify-end gap-2 border-t border-slate-200 p-4">
                <button type="button" className="btn btn-secondary" onClick={close}>Volver</button>
                <button className="btn btn-danger">Confirmar anulación</button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </section>
  )
}
