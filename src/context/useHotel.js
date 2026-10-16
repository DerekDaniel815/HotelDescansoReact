import { createContext, useContext } from 'react'

export const HotelContext = createContext(null)

export function useHotel() {
  const context = useContext(HotelContext)
  if (!context) throw new Error('useHotel debe usarse dentro de HotelProvider')
  return context
}
