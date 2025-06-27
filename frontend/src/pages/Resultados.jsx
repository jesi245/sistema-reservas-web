import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buscarHoteles } from '../services/hotelService';
import LoginModal from '../components/LoginHuespedModal'; // 👈 Asegurate que sea el correcto
import './Resultados.css'; 

const Resultados = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultados, setResultados] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [redirectHotelId, setRedirectHotelId] = useState(null);

  const obtenerParametros = () => {
    const params = new URLSearchParams(location.search);
    return {
      ciudad: params.get('ciudad')?.toLowerCase() || '',
      tipo: params.get('tipo')?.toLowerCase() || '',
      fechaEntrada: params.get('fechaEntrada') || '',
      fechaSalida: params.get('fechaSalida') || ''
    };
  };

  useEffect(() => {
    const fetchResultados = async () => {
      const filtros = obtenerParametros();
      try {
        const data = await buscarHoteles(filtros);
        setResultados(data);
      } catch (error) {
        console.error('Error al buscar hoteles:', error);
      }
    };

    fetchResultados();
  }, [location.search]);

  const handleReservar = (hotelId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // Mostrar modal de login
      setRedirectHotelId(hotelId);
      setShowLogin(true);
    } else {
      navigate(`/api/reservas/${hotelId}`);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    if (redirectHotelId) {
      navigate(`/api/reservas/${redirectHotelId}`);
    }
  };

  return (
    <>
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />

      <section className='packages' id='packages'>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
          Resultados de búsqueda
        </h1>

        {resultados.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No se encontraron alojamientos.</p>
        ) : (
          <div className="box-container">
            {resultados.map((hotel) => (
              <div className="box" key={hotel._id}>
                <img
                  src={
                    hotel.fotos && hotel.fotos.length > 0
                      ? hotel.fotos[0]
                      : 'https://via.placeholder.com/400x200'
                  }
                  alt={hotel.nombre}
                />
                <div className="content">
                  <h3>
                    <i className="fas fa-map-marker-alt"></i> {hotel.nombre}
                  </h3>
                  <p>{hotel.descripcion}</p>
                  <p>
                    <strong>Servicios:</strong>{' '}
                    {hotel.servicios?.join(', ') || 'No especificado'}
                  </p>

                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="fas fa-star" style={{ color: '#ffa500' }}></i>
                    ))}
                  </div>
                  <p>
                    Valoración: <span className="valoracionSeleccionada">0</span> estrellas
                  </p>

                  <div className="price">
                    ${hotel.precioPorNoche.toLocaleString()} <span>$</span>
                  </div>
                  <button
                    className="btn"
                    onClick={() => handleReservar(hotel._id)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Resultados;
