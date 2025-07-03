import { useEffect, useRef, useState } from 'react';
import './AdminDashBoard.css';
import CargarHabitacion from './AdminCargarHabitacionForm';
import HotelInfoForm from '../components/HotelInfoForm';
import HotelInfoView from '../components/HotelInfoView';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import fotoPerfil from '../assets/img/Gong_Yoo33.webp';
import axios from 'axios';
import ReservasActuales from '../components/ReservasActuales';
import CheckInsRealizados from '../components/CheckInsRealizados';
import HabitacionesDisponibles from '../components/HabitacionesDisponibles';
import EncuestaSatisfaccion from '../components/EncuestaSatisfaccion';
import PreciosDinamicos from '../components/PreciosDinamicos';


const AdminDashboard = () => {
  const [vistaActiva, setVistaActiva] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [errorCarga, setErrorCarga] = useState(null);

  const menuRef = useRef(null);
  const contenidoRef = useRef(null);
  const menuBtnRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto(prev => !prev);
  };

  const cerrarSesion = () => {
    logout();
    setVistaActiva('');
    setMenuAbierto(false);
    navigate('/api/auth/login-admin');
  };

  // 🔄 Cargar info del hotel al montar el componente
  useEffect(() => {
    const fetchHotelInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/hotel-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setHotelInfo(res.data); // 👈 res.data es un objeto único
        } else {
          setHotelInfo(null);
        }
        setErrorCarga(null);
      } catch (err) {
        console.error(err);
        setErrorCarga('Error al cargar la información del hotel');
      }
    };

    fetchHotelInfo();
  }, []);

  const abrirPerfilHotel = () => {
    setVistaActiva('perfil');
    setModoEdicion(!hotelInfo); // Si no hay info → edición
  };

  const guardarInfoHotel = async (info) => {
    try {
      const token = localStorage.getItem('token');
      let res;

      if (hotelInfo?._id) {
        // 🔁 Actualizar si ya existe
        res = await axios.put(
          `http://localhost:5000/api/hotel-info/actualizar/${hotelInfo._id}`,
          info,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHotelInfo(res.data.data);
      } else {
        // 🆕 Crear si no hay
        res = await axios.post(
          'http://localhost:5000/api/hotel-info/crear',
          info,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHotelInfo(res.data.data || info);
      }

      setModoEdicion(false);
      setVistaActiva('perfil');
    } catch (error) {
      console.error("❌ Error al guardar o actualizar info del hotel:", error);
      alert("Error al guardar la información del hotel");
    }
  };

  const editarInfoHotel = () => {
    setModoEdicion(true);
  };

  const renderContenido = () => {
    switch (vistaActiva) {
      case 'cargar':
        return <CargarHabitacion />;
      case 'reservas':
        return <ReservasActuales />;
      case 'checkins':
        return <CheckInsRealizados />;
      case 'disponibilidad':
        return <HabitacionesDisponibles/>;
      case 'ocupadas':
        return <p>Sección de Ocupadas (por implementar)</p>;
      case 'perfil':
        return modoEdicion ? (
          <HotelInfoForm
            infoInicial={hotelInfo}
            onSubmit={guardarInfoHotel}
            onCancelar={() => setModoEdicion(false)}
          />
        ) : (
          <HotelInfoView info={hotelInfo} onEditar={editarInfoHotel} />
        );
      case 'precios':
        return <PreciosDinamicos/>;
      case 'encuestas':
        return <EncuestaSatisfaccion/>;
      default:
        return errorCarga ? (
          <p className="error">{errorCarga}</p>
        ) : (
          <p className='mensaje-bienvenida'>Selecciona una opción del menú</p>
        );
    }
  };

  return (
    <section className='panel-admin'>
      <div
        className="menu"
        ref={menuRef}
        style={{ left: menuAbierto ? '0' : '-320px' }}
      >
        <div className="menu-header">
          <img src={fotoPerfil} alt="Foto de perfil" className="foto-perfil" />
          <h2>Bienvenido</h2>
        </div>
        <div className="menu-items">
          <button onClick={abrirPerfilHotel}><i className="fa fa-user"></i> Perfil del Hotel</button>
          <button onClick={() => setVistaActiva('reservas')}><i className="fa fa-calendar-check"></i> Ver Reservas Actuales</button>
          <button onClick={() => setVistaActiva('checkins')}><i className="fa fa-check"></i> Ver Check-In Realizados</button>
          {/*<button onClick={() => setVistaActiva('disponibilidad')}><i className="fa fa-bed"></i> Disponibilidad de Habitaciones</button>*/}
          {/*<button onClick={() => setVistaActiva('ocupadas')}><i className="fa fa-door-closed"></i> Habitaciones Ocupadas</button>*/}
         <button onClick={() => setVistaActiva('cargar')}><i className="fa fa-plus"></i> Cargar Nueva Habitación</button>
          <button onClick={() => setVistaActiva('precios')}><i className="fa fa-dollar-sign"></i> Motor de Precios Dinámicos</button>
          <button onClick={() => setVistaActiva('encuestas')}><i className="fa fa-envelope"></i> Encuestas de Satisfacción</button>
          <button onClick={cerrarSesion}><i className="fa fa-sign-out-alt"></i> Cerrar Sesión</button>
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

export default AdminDashboard;


