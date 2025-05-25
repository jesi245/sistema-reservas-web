import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminHotelForm from './pages/AdminCargarHabitacionForm';
import Resultados from './pages/Resultados'; // 
import Registro from './pages/RegistroAdmin';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './pages/AdminDashBoard';
import Reserva from './pages/Reserva';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/hoteles/nuevo" element={<AdminHotelForm />} />
        <Route path="/resultados" element={<Resultados />} /> 
        <Route path="/api/auth/registrar" element={<Registro />} />
        <Route path="/api/auth/login" element={<LoginAdmin />} />
        <Route path="/admin/panel" element={<AdminDashboard />} />
        <Route path="/admin/cargar-habitacion" element={<AdminHotelForm />} />
        <Route path="/api/reservas/:id" element={<Reserva />} />
      </Routes>
    </Router>
  );
}

export default App;

