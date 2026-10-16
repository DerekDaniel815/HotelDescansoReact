import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { HotelProvider } from './context/HotelContext'
import About from './pages/About'
import Guests from './pages/Guests'
import Home from './pages/Home'
import Reservations from './pages/Reservations'

export default function App() {
  return (
    <HotelProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="reservas" element={<Reservations />} />
            <Route path="huespedes" element={<Guests />} />
            <Route path="nosotros" element={<About />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HotelProvider>
  )
}
