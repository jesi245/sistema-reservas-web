import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { buscarHoteles } from '../services/hotelService';

const Resultados = () => {
  const location = useLocation();
  const [resultados, setResultados] = useState([]);

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

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-fondo)' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--color-principal)', marginBottom: '2rem' }}>
        Resultados de búsqueda
      </h1>

      {resultados.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No se encontraron alojamientos.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {resultados.map((hotel) => (
            <div
              key={hotel._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <img
                src={
                  hotel.fotos && hotel.fotos.length > 0
                    ? hotel.fotos[0]
                    : 'https://via.placeholder.com/400x200'
                }
                alt={hotel.nombre}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />

              <div style={{ padding: '1rem', flexGrow: 1 }}>
                <h2 style={{ margin: '0 0 0.5rem 0' }}>{hotel.nombre}</h2>
                <p style={{ margin: '0 0 1rem 0' }}>{hotel.descripcion}</p>
                {hotel.servicios && hotel.servicios.length > 0 && (
  <p style={{ margin: '0 0 1rem 0' }}>
    <strong>Servicios:</strong> {hotel.servicios.join(', ')}
  </p>
)}

                <strong>Precio por noche: ${hotel.precioPorNoche}</strong>
              </div>

              <div style={{ padding: '1rem' }}>
                <button
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    window.location.href = `/checkin/${hotel._id}`;
                  }}
                >
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resultados;

