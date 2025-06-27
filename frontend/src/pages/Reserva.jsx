import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerHotelPorId } from '../services/hotelService';
import { realizarReserva } from '../services/reservaService';
import imagenFondo from '../assets/img/Como-decorar-una-habitacion-de-un-hotel.jpg';
import './Reserva.css';

const Reserva = () => {
  const { id } = useParams(); // ID del hotel
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [formData, setFormData] = useState({
    fechaEntrada: '',
    fechaSalida: ''
  });

  const [showResumen, setShowResumen] = useState(false);
  const [resumenReserva, setResumenReserva] = useState(null);

  const huesped = JSON.parse(localStorage.getItem('huesped'));

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await obtenerHotelPorId(id);
        setHotel(data);
      } catch (error) {
        console.error('Error al obtener el hotel:', error);
      }
    };
    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReserva = async (e) => {
    e.preventDefault();

    if (!huesped) {
      alert('Debes iniciar sesión como huésped para reservar.');
      return;
    }

    try {
      const reservaData = {
        hotelId: id,
        fechaEntrada: formData.fechaEntrada,
        fechaSalida: formData.fechaSalida,
        nombre: `${huesped.nombreHuesped} ${huesped.apellidoHuesped}`,
        email: huesped.email
      };

      await realizarReserva(reservaData);

      // Mostrar resumen
      setResumenReserva({
        hotel: hotel.nombre,
        nombre: reservaData.nombre,
        email: reservaData.email,
        fechaEntrada: reservaData.fechaEntrada,
        fechaSalida: reservaData.fechaSalida,
        precio: hotel.precioPorNoche
      });
      setShowResumen(true);
    } catch (error) {
      console.error('Error al reservar:', error);
      alert('Ocurrió un error al realizar la reserva');
    }
  };

  if (!hotel) return <p>Cargando hotel...</p>;

  return (
    <div className='login-container'>
      <div className="login-left">
        <img src={imagenFondo} alt="Imagen de fondo" />
      </div>

      <div className='login-right'>
        <div className='login-form'>
          <h2>Reservar en {hotel.nombre}</h2>
          <p className='precio'>Precio por noche: ${hotel.precioPorNoche}</p>

          {huesped && (
            <>
              <p><strong>Nombre:</strong> {huesped.nombreHuesped} {huesped.apellidoHuesped}</p>
              <p><strong>Email:</strong> {huesped.email}</p>
            </>
          )}

          <form onSubmit={handleReserva}>
            <label>Fecha de entrada</label>
            <input
              type="date"
              name="fechaEntrada"
              value={formData.fechaEntrada}
              onChange={handleChange}
              required
            />

            <label>Fecha de salida</label>
            <input
              type="date"
              name="fechaSalida"
              value={formData.fechaSalida}
              onChange={handleChange}
              required
            />

            <button type="submit">Confirmar reserva</button>
          </form>
        </div>
      </div>

      {showResumen && resumenReserva && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¡Reserva Confirmada 🎉!</h2>
            <p><strong>Hotel:</strong> {resumenReserva.hotel}</p>
            <p><strong>Nombre:</strong> {resumenReserva.nombre}</p>
            <p><strong>Email:</strong> {resumenReserva.email}</p>
            <p><strong>Entrada:</strong> {resumenReserva.fechaEntrada}</p>
            <p><strong>Salida:</strong> {resumenReserva.fechaSalida}</p>
            <p><strong>Precio por noche:</strong> ${resumenReserva.precio}</p>
            <button onClick={() => navigate('/huesped/panel')}>
              Ir a mi panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;
