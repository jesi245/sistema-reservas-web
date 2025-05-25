/*port React, { useState } from 'react';
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

  return (/*
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
    <>
        </>
    
  );
};


export default FiltroBuscar;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FiltroBuscar.css'; // Por si tenés estilos personalizados

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
    <section className="data-box">
      <h2>¡Bienvenido! Tus reservas, más simples.</h2>
      <p>Hoteles y alojamientos donde vayas.</p>

      <form onSubmit={handleSubmit}>
        {/* Ciudad */}
        <input
          type="text"
          name="ciudad"
          id="search-box"
          placeholder="Ciudad o provincia"
          value={busqueda.ciudad}
          onChange={handleChange}
        />

        {/* Tipo de alojamiento */}
        <label htmlFor="opciones">Tipo de alojamiento:</label>
        <select
          id="opciones"
          name="tipo"
          value={busqueda.tipo}
          onChange={handleChange}
        >
          <option value="">Seleccioná una opción</option>
          <option value="hotel">Hotel</option>
          <option value="hostel">Hostel</option>
          <option value="cabaña">Cabaña</option>
        </select>

        {/* Fechas */}
        <label htmlFor="fecha-inicio">Fecha de inicio:</label>
        <input
          type="date"
          id="fecha-inicio"
          name="fechaEntrada"
          value={busqueda.fechaEntrada}
          onChange={handleChange}
        />

        <label htmlFor="fecha-fin">Fecha de fin:</label>
        <input
          type="date"
          id="fecha-fin"
          name="fechaSalida"
          value={busqueda.fechaSalida}
          onChange={handleChange}
        />

        {/* Botón */}
        <button id="btnBuscar" className="btn" type="submit">
          BUSCAR
        </button>
      </form>
    </section>
  );
};

export default FiltroBuscar;

