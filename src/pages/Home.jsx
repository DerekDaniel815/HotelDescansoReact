import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { rooms, services, slides, testimonials } from '../data'

export default function Home() {
  const location = useLocation()
  const [slide, setSlide] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [calendarDate, setCalendarDate] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [today] = useState(() => {
    const value = new Date()
    value.setHours(0, 0, 0, 0)
    return value
  })

  useEffect(() => {
    const timer = setInterval(() => setSlide((value) => (value + 1) % slides.length), 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!location.hash) return
    document.querySelector(location.hash)?.scrollIntoView()
  }, [location])

  useEffect(() => {
    if (!selectedRoom) return undefined
    function onKey(event) {
      if (event.key === 'Escape') setSelectedRoom(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selectedRoom])

  const calendarDays = useMemo(() => {
    const prefix = Array(calendarDate.getDay()).fill(null)
    const amount = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate()
    return [...prefix, ...Array.from({ length: amount }, (_, index) => index + 1)]
  }, [calendarDate])

  const monthLabel = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric' }).format(calendarDate)
  const availableRooms = rooms.filter((room) => room.available).length

  function dayState(day) {
    if (!day) return ''
    const date = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day)
    if (date < today) return 'bg-slate-100 text-slate-400'
    return [8, 9, 17, 18, 25].includes(day) ? 'bg-red-100 text-red-800 line-through' : 'bg-emerald-100 text-emerald-800'
  }

  return (
    <>
      <section className="bg-slate-600 py-14 text-white">
        <div className="container-hotel grid items-center gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-amber-300">Sistema de gestión</p>
            <h1 className="text-4xl font-bold sm:text-5xl">Hotel El Descanso Eterno</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">Gestiona reservas, habitaciones y huéspedes desde un solo lugar. Experimenta nuestro servicio exclusivo pet-friendly.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/reservas" className="btn bg-amber-400 text-slate-900 hover:bg-amber-300">＋ Nueva Reserva</Link>
              <Link to="/reservas" className="btn border border-white text-white hover:bg-white/10">☷ Ver Reservas</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-2">
            {[
              ['12', 'Reservas activas'],
              ['8', 'Habitaciones libres'],
              ['34', 'Huéspedes'],
              ['S/12,480', 'Ingresos del mes'],
            ].map(([value, label]) => (
              <div key={label} className="card p-4 text-center text-slate-800">
                <strong className="block text-2xl">{value}</strong>
                <span className="text-sm text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-hotel my-12">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <div className={`flex h-56 w-full flex-col items-start justify-end p-8 text-white sm:h-96 lg:h-[620px] ${slides[slide].className}`}>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-white/80">Galería</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-5xl">{slides[slide].title}</h2>
            <p className="mt-2 max-w-xl text-lg text-white/85">{slides[slide].caption}</p>
          </div>
          <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-2xl text-white" aria-label="Imagen anterior" onClick={() => setSlide((value) => (value - 1 + slides.length) % slides.length)}>‹</button>
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-2xl text-white" aria-label="Imagen siguiente" onClick={() => setSlide((value) => (value + 1) % slides.length)}>›</button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((item, index) => (
              <button key={item.title} type="button" className={`h-2.5 w-2.5 rounded-full ${index === slide ? 'bg-white' : 'bg-white/50'}`} aria-label={`Ir a imagen ${index + 1}`} onClick={() => setSlide(index)} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-hotel my-12">
        <h2 className="section-title border-emerald-600">✦ Nuestros servicios</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {services.map(([icon, title, text]) => (
            <article key={title} className="card p-5 text-center transition hover:-translate-y-1.5 hover:shadow-lg">
              <div className="text-3xl text-blue-600">{icon}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="habitaciones" className="container-hotel my-12 scroll-mt-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-title mb-0">▣ Tipos de habitaciones</h2>
          <span className="badge bg-emerald-600 px-4 py-2 text-white">{availableRooms} de {rooms.length} habitaciones disponibles</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <article key={room.id} className="card flex overflow-hidden">
              <div className="flex w-full flex-col">
                <header className="flex justify-between bg-blue-600 p-4 font-semibold text-white">
                  <span>Hab. {room.number} — {room.type}</span>
                  <span className="badge bg-white/20">{room.status}</span>
                </header>
                <div className="flex-1 p-5">
                  <p className="text-slate-500">{room.description}</p>
                  <p className="mt-5 text-xl font-bold text-amber-500">S/ {room.price} <span className="text-sm font-normal text-slate-500">/ noche</span></p>
                </div>
                <footer className="flex gap-2 border-t border-slate-200 p-4">
                  <Link to="/reservas" className={`btn btn-primary flex-1 ${room.available ? '' : 'pointer-events-none opacity-50'}`}>
                    {room.available ? 'Reservar' : 'No disponible'}
                  </Link>
                  <button type="button" className="btn btn-outline px-3" aria-label="Ver detalle" onClick={() => { setSelectedRoom(room); setCalendarDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)) }}>◎</button>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-hotel my-12">
        <h2 className="section-title border-amber-400">❝ Lo que dicen nuestros huéspedes</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(([initials, name, quote]) => (
            <article key={name} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{initials}</span>
                <div>
                  <h3 className="font-bold">{name}</h3>
                  <p className="text-amber-400">★★★★★</p>
                </div>
              </div>
              <p className="mt-4 italic text-slate-500">“{quote}”</p>
            </article>
          ))}
        </div>
      </section>

      {selectedRoom && (
        <div className="modal-backdrop" onClick={() => setSelectedRoom(null)} role="presentation">
          <section className="modal-panel" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="room-title">
            <header className="flex items-center justify-between bg-amber-400 p-5">
              <h2 id="room-title" className="text-xl font-bold">Hab. {selectedRoom.number} — {selectedRoom.type}</h2>
              <button type="button" onClick={() => setSelectedRoom(null)} className="text-2xl" aria-label="Cerrar">×</button>
            </header>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded bg-slate-100 p-3"><small>Tipo</small><strong className="block">{selectedRoom.type}</strong></div>
                <div className="rounded bg-slate-100 p-3"><small>Precio / noche</small><strong className="block text-amber-500">S/ {selectedRoom.price}</strong></div>
              </div>
              <p className="mt-4 text-sm text-slate-500">{selectedRoom.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedRoom.amenities.map((item) => <span key={item} className="badge bg-slate-600 text-white">✓ {item}</span>)}
              </div>
              <div className="my-5 border-t border-slate-200" />
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Disponibilidad</h3>
                <div>
                  <button type="button" className="btn btn-outline px-3 py-1" onClick={() => setCalendarDate((value) => new Date(value.getFullYear(), value.getMonth() - 1, 1))}>‹</button>
                  <span className="inline-block min-w-36 text-center capitalize">{monthLabel}</span>
                  <button type="button" className="btn btn-outline px-3 py-1" onClick={() => setCalendarDate((value) => new Date(value.getFullYear(), value.getMonth() + 1, 1))}>›</button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((dayName, index) => <span key={`${dayName}-${index}`}>{dayName}</span>)}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div key={`${day ?? 'empty'}-${index}`} className={`flex aspect-square items-center justify-center rounded text-sm ${dayState(day)}`}>{day}</div>
                ))}
              </div>
            </div>
            <footer className="flex justify-end gap-2 border-t border-slate-200 p-4">
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedRoom(null)}>Cerrar</button>
              <Link to="/reservas" className="btn btn-primary">Reservar</Link>
            </footer>
          </section>
        </div>
      )}
    </>
  )
}
