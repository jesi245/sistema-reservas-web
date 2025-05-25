import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerHotelPorId } from '../services/hotelService'; 
import { realizarReserva } from '../services/reservaService'; 
import imagenFondo from '../assets/img/Como-decorar-una-habitacion-de-un-hotel.jpg'
import './Reserva.css'

const Reserva = () => {
  const { id } = useParams(); // ID del hotel
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [usuario, setUsuario] = useState(null); // Simula si hay un usuario logueado
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaEntrada: '',
    fechaSalida: ''
  });

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
    try {
      await realizarReserva({ ...formData, hotelId: id });
      alert('Reserva realizada con éxito!');
      navigate('/');
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

          <form onSubmit={handleReserva}>
            
            <input type="text" name="nombre" placeholder='Nombre Completo' value={formData.nombre} onChange={handleChange} required />

            
            <input type="email" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange} required />

            <label>Fecha de entrada</label>
            <input type="date" name="fechaEntrada" value={formData.fechaEntrada} onChange={handleChange} required />

            <label>Fecha de salida</label>
            <input type="date" name="fechaSalida" value={formData.fechaSalida} onChange={handleChange} required />

            <button type="submit">Confirmar reserva</button>
           
            
          
          </form>
                        <p className='cuenta'>¿Ya tenés cuenta? <button className='btn-registrarse' onClick={() => navigate('/login')}>Iniciar sesión</button></p>
              
              <p className='cuenta'>¿Sos nuevo? <button className='btn-registrarse' onClick={() => navigate('/registro')}>Registrarse</button></p>

          
        </div>
      </div>
      
    </div>
      
  );
};

export default Reserva;
