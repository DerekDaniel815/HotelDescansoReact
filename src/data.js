export const rooms = [
  {
    id: 1,
    number: '101',
    type: 'Simple',
    price: 120,
    status: 'Disponible',
    available: true,
    description: 'Habitación cómoda con cama individual, escritorio y baño privado.',
    amenities: ['WiFi', 'Desayuno', 'TV'],
  },
  {
    id: 2,
    number: '202',
    type: 'Doble',
    price: 190,
    status: 'Ocupada hoy',
    available: false,
    description: 'Amplia habitación con cama doble, vista exterior y minibar.',
    amenities: ['WiFi', 'Desayuno', 'Minibar'],
  },
  {
    id: 3,
    number: '305',
    type: 'Pet-friendly',
    price: 230,
    status: 'Disponible',
    available: true,
    description: 'Espacio especial para disfrutar la estadía junto a tu mascota.',
    amenities: ['WiFi', 'Desayuno', 'Kit para mascota'],
  },
]

export const services = [
  ['◉', 'WiFi gratis', 'Internet de alta velocidad en todo el hotel'],
  ['☕', 'Desayuno incluido', 'Buffet variado todas las mañanas'],
  ['≈', 'Piscina', 'Área de relajación abierta todo el año'],
  ['♥', 'Pet-friendly', 'Tu mascota también es bienvenida'],
  ['P', 'Estacionamiento', 'Espacio seguro y gratuito para huéspedes'],
]

export const slides = [
  {
    title: 'San Isidro al atardecer',
    caption: 'Un descanso tranquilo en el centro de Lima.',
    className: 'bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#f59e0b_100%)]',
  },
  {
    title: 'Habitaciones luminosas',
    caption: 'Camas cómodas, desayuno y WiFi en cada estadía.',
    className: 'bg-[linear-gradient(135deg,#064e3b_0%,#0f766e_50%,#fde68a_100%)]',
  },
  {
    title: 'También para tu mascota',
    caption: 'Habitaciones pet-friendly pensadas para viajar juntos.',
    className: 'bg-[linear-gradient(135deg,#312e81_0%,#7c3aed_45%,#fb7185_100%)]',
  },
]

export const testimonials = [
  ['MG', 'María Gutiérrez', 'Excelente atención y la habitación estaba impecable. Poder hospedarme con mi perro fue lo mejor.'],
  ['JR', 'Jorge Ramírez', 'La reserva fue rápida y el desayuno buffet superó mis expectativas.'],
  ['LT', 'Lucía Torres', 'Un hotel cómodo, limpio y con muy buena ubicación.'],
]

export const initialGuests = [
  { id: 1, name: 'María', paternal: 'Gutiérrez', maternal: 'López', dni: '72451238', phone: '987654321', email: 'maria@correo.com', status: 'Activo' },
  { id: 2, name: 'Jorge', paternal: 'Ramírez', maternal: 'Soto', dni: '45127896', phone: '956123789', email: 'jorge@correo.com', status: 'Hospedado' },
  { id: 3, name: 'Lucía', paternal: 'Torres', maternal: 'Vega', dni: '70894561', phone: '965478123', email: 'lucia@correo.com', status: 'Activo' },
]

export const initialReservations = [
  { id: 1, guest: 'María Gutiérrez', room: '101', type: 'Simple', entry: '2026-09-05', exit: '2026-09-08', nights: 3, total: 360, status: 'Confirmada', price: 120 },
  { id: 2, guest: 'Jorge Ramírez', room: '202', type: 'Doble', entry: '2026-09-12', exit: '2026-09-14', nights: 2, total: 380, status: 'Pendiente', price: 190 },
  { id: 3, guest: 'Lucía Torres', room: '305', type: 'Pet-friendly', entry: '2026-08-20', exit: '2026-08-24', nights: 4, total: 920, status: 'Anulada', price: 230 },
]

export function guestLabel(guest) {
  return `${guest.name} ${guest.paternal}`
}

export function formatDate(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

export function money(value) {
  return `S/ ${Number(value).toFixed(2)}`
}

export function nightsBetween(entry, exit) {
  if (!entry || !exit) return 0
  const start = new Date(`${entry}T00:00:00`).getTime()
  const end = new Date(`${exit}T00:00:00`).getTime()
  return Math.max(0, (end - start) / 86400000)
}
