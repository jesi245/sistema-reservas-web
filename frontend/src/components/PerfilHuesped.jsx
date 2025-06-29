import React, { useState, useEffect } from 'react';
import { actualizarPerfilHuesped } from '../services/huespedService';
import './PerfilHuesped.css';

const PerfilHuesped = () => {
  const [huesped, setHuesped] = useState(null);
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('huesped'));
    if (data) {
      setHuesped(data);
      setFormData(data);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si es dirección anidada
    if (name.startsWith('direccion.')) {
      const campo = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [campo]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const guardarCambios = async () => {
    try {
        const res = await actualizarPerfilHuesped(formData._id, formData); 
        localStorage.setItem('huesped', JSON.stringify(res.huesped));
        setHuesped(res.huesped);
        setEditandoCampo(null);
        alert('Perfil actualizado con éxito');
    } catch (error) {
        console.error('Error al guardar cambios:', error);
        alert('❌ Ocurrió un error al actualizar los datos');
    }
  };

  const cancelarEdicion = () => {
    setFormData(huesped);
    setEditandoCampo(null);
  };

  if (!huesped) return <p>Cargando datos del huésped...</p>;

  const renderCampo = (label, name, isDate = false) => {
    const valor = name.startsWith('direccion.')
      ? formData.direccion?.[name.split('.')[1]]
      : formData[name];

    return (
      <div className="campo-perfil" key={name}>
        <label>{label}:</label>
        {editandoCampo === name ? (
          <>
            <input
              name={name}
              type={isDate ? 'date' : 'text'}
              value={isDate ? valor?.slice(0, 10) : valor || ''}
              onChange={handleChange}
            />
            <button onClick={guardarCambios} className="btn-guardar">Guardar</button>
            <button onClick={cancelarEdicion} className="btn-cancelar">Cancelar</button>
          </>
        ) : (
          <>
            <span>{isDate && valor ? new Date(valor).toLocaleDateString() : valor}</span>
            <button onClick={() => setEditandoCampo(name)} className="btn-editar">✎</button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="perfil-huesped">
      <h2>Mi Perfil</h2>
      {renderCampo('Nombre', 'nombreHuesped')}
      {renderCampo('Apellido', 'apellidoHuesped')}
      {renderCampo('Email', 'email')}
      {renderCampo('Teléfono', 'tel')}
      {renderCampo('Fecha de nacimiento', 'fechaNacimiento', true)}
      {renderCampo('Nacionalidad', 'nacionalidad')}
      {renderCampo('Género', 'genero')}
      {renderCampo('País', 'direccion.pais')}
      {renderCampo('Ciudad', 'direccion.ciudad')}
      {renderCampo('Calle', 'direccion.calle')}
      {renderCampo('Código Postal', 'direccion.codigoPostal')}
      {renderCampo('N° de Pasaporte', 'nroPasaporte')}
    </div>
  );
};

export default PerfilHuesped;
