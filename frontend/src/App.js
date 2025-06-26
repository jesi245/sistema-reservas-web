import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminHotelForm from './pages/AdminCargarHabitacionForm';
import Resultados from './pages/Resultados'; // 
import RegistroAdmin from './pages/RegistroAdmin';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './pages/AdminDashBoard';
import HuespedDashBoard from './pages/HuespedDashBoard'
import Reserva from './pages/Reserva';
import RegistroHuesped from './pages/RegistroHuesped'
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/admin/hoteles/nuevo" element={<AdminHotelForm />} />
        <Route path="/resultados" element={<Resultados />} /> 
        <Route path="/api/auth/registrar-admin" element={<RegistroAdmin />} />
        <Route path="/api/auth/login-admin" element={<LoginAdmin />} />
        <Route path="/api/admin/panel" element={<PrivateRoute allowedRole="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/api/admin/cargar-habitacion" element={<PrivateRoute allowedRole="admin"><AdminHotelForm /></PrivateRoute>} />
        <Route path="/api/reservas/:id" element={<Reserva />} />
        <Route path="/api/auth/registrar-huesped" element={<RegistroHuesped />} />
        <Route path="/api/huesped/panel" element={<PrivateRoute allowedRole="huesped"><HuespedDashBoard /></PrivateRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;

