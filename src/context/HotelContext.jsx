import { useMemo, useState } from 'react'
import { guestLabel, initialGuests, initialReservations } from '../data'
import { HotelContext } from './useHotel'

export function HotelProvider({ children }) {
  const [guests, setGuests] = useState(initialGuests)
  const [reservations, setReservations] = useState(initialReservations)

  const value = useMemo(() => ({
    guests,
    reservations,
    saveGuest(guest) {
      if (guest.id) {
        setGuests((list) => list.map((item) => (item.id === guest.id ? { ...item, ...guest } : item)))
        return 'Los datos del huésped se actualizaron correctamente.'
      }
      setGuests((list) => [
        ...list,
        { ...guest, id: Math.max(...list.map((item) => item.id), 0) + 1, status: 'Activo' },
      ])
      return 'Huésped registrado correctamente.'
    },
    saveReservation(reservation) {
      if (reservation.id) {
        setReservations((list) => list.map((item) => (item.id === reservation.id ? { ...item, ...reservation } : item)))
        return 'Reserva actualizada correctamente.'
      }
      setReservations((list) => [
        ...list,
        { ...reservation, id: Math.max(...list.map((item) => item.id), 0) + 1 },
      ])
      return 'Reserva registrada correctamente.'
    },
    cancelReservation(id) {
      setReservations((list) => list.map((item) => (item.id === id ? { ...item, status: 'Anulada' } : item)))
      return 'La reserva fue anulada.'
    },
    guestNames: guests.map(guestLabel),
  }), [guests, reservations])

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
}

