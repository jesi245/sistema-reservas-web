import React, { useState } from 'react';
import { registrarHuesped } from '../services/authService';

const HuespedRegistroForm = () => {
  const [formulario, setFormulario] = useState({
    nombreHuesped: '',
    apellidoHuesped: '',
    email: '',
    tel: '',
    fechaNacimiento: '',
    nacionalidad: '',
    genero: '',
    direccion: {
      pais: '',
      calle: '',
      ciudad: '',
      codigoPostal: '',
    },
    nroPasaporte: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('direccion.')) {
      const campo = name.split('.')[1];
      setFormulario((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [campo]: value,
        },
      }));
    } else {
      setFormulario((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarHuesped(formulario);
      setMensaje('Huésped registrado con éxito.');
      setFormulario({
        nombreHuesped: '',
        apellidoHuesped: '',
        email: '',
        tel: '',
        fechaNacimiento: '',
        nacionalidad: '',
        genero: '',
        direccion: {
          pais: '',
          calle: '',
          ciudad: '',
          codigoPostal: '',
        },
        nroPasaporte: '',
      });
    } catch (error) {
      console.error('Error al registrar huésped:', error);
      setMensaje('Error al registrar huésped.');
    }
  };

  return (
    <div className="registro-form">
      <h2>Registro de Huésped</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombreHuesped" value={formulario.nombreHuesped} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="apellidoHuesped" value={formulario.apellidoHuesped} onChange={handleChange} placeholder="Apellido" required />
        <input type="email" name="email" value={formulario.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="tel" value={formulario.tel} onChange={handleChange} placeholder="Teléfono" required />
        <input type="date" name="fechaNacimiento" value={formulario.fechaNacimiento} onChange={handleChange} required />
        <input type="text" name="nacionalidad" value={formulario.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" required />
        <input type="text" name="genero" value={formulario.genero} onChange={handleChange} placeholder="Género" required />
        <input type="text" name="direccion.pais" value={formulario.direccion.pais} onChange={handleChange} placeholder="País" required />
        <input type="text" name="direccion.calle" value={formulario.direccion.calle} onChange={handleChange} placeholder="Calle" required />
        <input type="text" name="direccion.ciudad" value={formulario.direccion.ciudad} onChange={handleChange} placeholder="Ciudad" required />
        <input type="text" name="direccion.codigoPostal" value={formulario.direccion.codigoPostal} onChange={handleChange} placeholder="Código Postal" required />
        <input type="text" name="nroPasaporte" value={formulario.nroPasaporte} onChange={handleChange} placeholder="N° Pasaporte" required />

        <button type="submit">Registrar Huésped</button>
      </form>
    </div>
  );
};

export default HuespedRegistroForm;
