import React, { useEffect, useState } from 'react';
import { getReservasByEmail, cancelarReserva, checkInReserva } from '../services/reservaService';
import { getHotelesRecomendados } from '../services/hotelService';
import { useNavigate } from 'react-router-dom';
import MensajeModal from '../components/MensajeModal';
import './MisReservas.css';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    tipo: '',
    fechaEntrada: '',
    fechaSalida: ''
  });

  const huesped = JSON.parse(localStorage.getItem('huesped'));
  const navigate = useNavigate();

  // Estado para modales
  const [modal, setModal] = useState({
    show: false,
    mensaje: '',
    esConfirmacion: false,
    onConfirm: null
  });

  const mostrarModal = (mensaje, esConfirmacion = false, onConfirm = null) => {
    setModal({ show: true, mensaje, esConfirmacion, onConfirm });
  };

  const cerrarModal = () => {
    setModal({ show: false, mensaje: '', esConfirmacion: false, onConfirm: null });
  };

  // Obtener reservas activas
  useEffect(() => {
    const fetchReservas = async () => {
      if (!huesped?.email) return;
      try {
        const data = await getReservasByEmail(huesped.email);
        setReservas(data);
      } catch (error) {
        console.error('Error al traer reservas:', error);
      }
    };

    fetchReservas();
  }, [huesped]);

  // Obtener recomendaciones
  useEffect(() => {
    const fetchRecomendaciones = async () => {
      try {
        const data = await getHotelesRecomendados();
        setRecomendaciones(data);
      } catch (error) {
        console.error('Error al traer recomendaciones:', error);
      }
    };

    fetchRecomendaciones();
  }, []);

  const handleChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(busqueda).toString();
    navigate(`/resultados?${queryParams}`);
  };

  const confirmarCancelarReserva = (reservaId) => {
    mostrarModal('¿Estás seguro de cancelar esta reserva?', true, async () => {
      try {
        await cancelarReserva(reservaId);
        cerrarModal();
        mostrarModal('Reserva cancelada correctamente. Se envió un email de confirmación.');
        setReservas(reservas.filter(r => r._id !== reservaId));
      } catch (error) {
        cerrarModal();
        console.error('Error al cancelar la reserva:', error);
        mostrarModal('Ocurrió un error al intentar cancelar.');
      }
    });
  };

  const confirmarCheckIn = (reservaId) => {
    mostrarModal('¿Estás seguro de realizar el check-in?', true, async () => {
      try {
        await checkInReserva(reservaId);
        cerrarModal();
        mostrarModal('Check-in realizado correctamente. Se envió un email de confirmación.');
        setReservas(reservas.map(r => r._id === reservaId ? { ...r, checkInRealizado: true } : r));
      } catch (error) {
        cerrarModal();
        console.error('Error al realizar check-in:', error);
        mostrarModal('Ocurrió un error al intentar hacer el check-in.');
      }
    });
  };

  if (!huesped) return <p>Iniciá sesión para ver tus reservas.</p>;

  return (
    <section className="mis-reservas-container">
      <h2 className="titulo-seccion">Mis Reservas Actuales</h2>
      {reservas.length === 0 ? (
        <p>No tenés reservas activas aún.</p>
      ) : (
        <div className="reservas-lista">
          {reservas.map((reserva, index) => (
            <div key={index} className="card-reserva">
              <h3>{reserva.hotelId?.nombre || 'Hotel desconocido'}</h3>
              <p><strong>Fecha de entrada:</strong> {new Date(reserva.fechaEntrada).toLocaleDateString()}</p>
              <p><strong>Fecha de salida:</strong> {new Date(reserva.fechaSalida).toLocaleDateString()}</p>
              <p><strong>Ciudad:</strong> {reserva.hotelId?.ciudad}</p>
              <p><strong>Precio:</strong> ${reserva.hotelId?.precioPorNoche}</p>
              {!reserva.checkInRealizado && (
                <button className="btn-cancelar" onClick={() => confirmarCancelarReserva(reserva._id)}>
                  CANCELAR
                </button>
              )}
              {!reserva.checkInRealizado ? (
                <button className="btn-checkin" onClick={() => confirmarCheckIn(reserva._id)}>
                  REALIZAR CHECK-IN
                </button>
              ) : (
                <p className="checkin-realizado">✅ CHECK-IN REALIZADO</p>
              )}
            </div>
          ))}
        </div>
      )}

      <section className="nuevas-busquedas">
        <h2 className='titulo-seccion'>¿Buscás algo nuevo?</h2>
        <form className="form-busqueda" onSubmit={handleSubmit}>
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad o provincia"
            value={busqueda.ciudad}
            onChange={handleChange}
          />
          <select name="tipo" value={busqueda.tipo} onChange={handleChange}>
            <option value="">Tipo de alojamiento</option>
            <option value="hotel">Hotel</option>
            <option value="hostel">Hostel</option>
            <option value="cabaña">Cabaña</option>
          </select>
          <button type="submit">BUSCAR</button>
        </form>
      </section>

      <section className="recomendaciones">
        <h2 className='titulo-seccion'>También te pueden interesar</h2>
        <div className="recomendaciones-grid">
          {recomendaciones.map((hotel) => (
            <div key={hotel._id} className="reco-card">
              <img
                src={hotel.fotos?.[0] || 'https://via.placeholder.com/300x200'}
                alt={hotel.nombre}
                className="reco-img"
              />
              <div className="reco-info">
                <h3>{hotel.nombre}</h3>
                <p>{hotel.descripcion || 'Sin descripción disponible'}</p>
                <p><strong>Precio por noche:</strong> ${hotel.precioPorNoche}</p>
                <button onClick={() => navigate(`/api/reservas/${hotel._id}`)}>RESERVAR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MensajeModal
        show={modal.show}
        mensaje={modal.mensaje}
        esConfirmacion={modal.esConfirmacion}
        onConfirm={modal.onConfirm}
        onClose={cerrarModal}
      />
    </section>
  );
};

export default MisReservas;
