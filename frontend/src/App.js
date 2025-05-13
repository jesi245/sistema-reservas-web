import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminHotelForm from './pages/AdminHotelForm';
import Resultados from './pages/Resultados'; // 👈 Importación nueva
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/hoteles/nuevo" element={<AdminHotelForm />} />
        <Route path="/resultados" element={<Resultados />} /> {/* 👈 Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;

