import { useEffect, useRef, useState } from 'react';
import './AdminDashBoard.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import fotoPerfil from '../assets/img/Gong_Yoo33.webp';

const HuespedDashboard = () => {
  const [vistaActiva, setVistaActiva] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [huesped, setHuesped] = useState(null);

  const menuRef = useRef(null);
  const contenidoRef = useRef(null);
  const menuBtnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHuesped = JSON.parse(localStorage.getItem('huesped'));
    if (storedHuesped) {
      setHuesped(storedHuesped);
    }
  }, []);

  const toggleMenu = () => {
    setMenuAbierto(prev => !prev);
  };

  const cerrarSesion = () => {
    logout();
    setVistaActiva('');
    setMenuAbierto(false);
    navigate('/');
  };

  const renderContenido = () => {
    switch (vistaActiva) {
      case 'cargar':
        return <p>Sección (por implementar)</p>;
      case 'checkin':
        return <p>Sección de Check-In (por implementar)</p>;
      case 'disponibilidad':
        return <p>Sección de Disponibilidad (por implementar)</p>;
      case 'ocupadas':
        return <p>Sección de Ocupadas (por implementar)</p>;
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  return (
    <section className='panel-huesped'>
      <div
        className="menu"
        ref={menuRef}
        style={{ left: menuAbierto ? '0' : '-320px' }}
      >
        <div className="menu-header">
          <img src={fotoPerfil} alt="Foto de perfil" className="foto-perfil" />
          <h2>
            {huesped ? `¡Bienvenido, ${huesped.nombreHuesped}!` : '¡Bienvenido!'}
          </h2>
        </div>
        <div className="menu-items">
          <button onClick={() => setVistaActiva('checkin')}>
            <i className="fa fa-check"></i> Mi Perfil
          </button>
          <button onClick={() => setVistaActiva('disponibilidad')}>
            <i className="fa fa-bed"></i> Mis Reservas
          </button>
          <button onClick={() => setVistaActiva('ocupadas')}>
            <i className="fa fa-door-closed"></i> Check-in
          </button>
          <button onClick={() => setVistaActiva('cargar')}>
            <i className="fa fa-plus"></i> Encuesta
          </button>
          <button onClick={cerrarSesion}>
            <i className="fa fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </div>

      <div
        className="contenido"
        ref={contenidoRef}
        style={{ marginLeft: menuAbierto ? '320px' : '0' }}
      >
        <button className="menu-btn" onClick={toggleMenu} ref={menuBtnRef}>
          &#9776;
        </button>
        {renderContenido()}
      </div>
    </section>
  );
};

export default HuespedDashboard;
