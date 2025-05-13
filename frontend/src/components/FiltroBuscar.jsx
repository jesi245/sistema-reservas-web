import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FiltroBuscar = () => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    tipo: '',
    fechaEntrada: '',
    fechaSalida: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      ciudad: busqueda.ciudad,
      tipo: busqueda.tipo,
      fechaEntrada: busqueda.fechaEntrada,
      fechaSalida: busqueda.fechaSalida
    }).toString();

    navigate(`/resultados?${queryParams}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{ color: 'var(--color-principal)' }}>Buscar alojamiento</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad o provincia"
          value={busqueda.ciudad}
          onChange={handleChange}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <select
          name="tipo"
          value={busqueda.tipo}
          onChange={handleChange}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        >
          <option value="">Tipo de alojamiento</option>
          <option value="hotel">Hotel</option>
          <option value="hostel">Hostel</option>
          <option value="cabaña">Cabaña</option>
        </select>
        <input
          type="date"
          name="fechaEntrada"
          value={busqueda.fechaEntrada}
          onChange={handleChange}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <input
          type="date"
          name="fechaSalida"
          value={busqueda.fechaSalida}
          onChange={handleChange}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--color-principal)',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default FiltroBuscar;
