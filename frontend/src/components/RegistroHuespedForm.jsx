import React, { useState } from 'react';
import './RegistroHuespedForm.css';

const RegistroHuespedForm = ({ onSubmit }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formulario); // delegamos el envío
  };

  return (
    <div className="register-form-container" id="register-form">
      <i className="fas fa-times" id="register-close"></i>

      <form onSubmit={handleSubmit} className="registro-form">
        <h3>Registro del huésped</h3>

        <input
          type="text"
          name="nombreHuesped"
          className="box"
          placeholder="Nombre"
          value={formulario.nombreHuesped}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="apellidoHuesped"
          className="box"
          placeholder="Apellido"
          value={formulario.apellidoHuesped}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          className="box"
          placeholder="Correo electrónico"
          value={formulario.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="tel"
          className="box"
          placeholder="Teléfono"
          value={formulario.tel}
          onChange={handleChange}
          required
        />

        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          className="box"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="nacionalidad"
          className="box"
          placeholder="Nacionalidad"
          value={formulario.nacionalidad}
          onChange={handleChange}
          required
        />

        <label>Género:</label>
        <select
          name="genero"
          className="box"
          value={formulario.genero}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <input
          type="text"
          name="direccion.pais"
          className="box"
          placeholder="País"
          value={formulario.direccion.pais}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="direccion.calle"
          className="box"
          placeholder="Dirección o calle"
          value={formulario.direccion.calle}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="direccion.ciudad"
          className="box"
          placeholder="Ciudad"
          value={formulario.direccion.ciudad}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="direccion.codigoPostal"
          className="box"
          placeholder="Código postal"
          value={formulario.direccion.codigoPostal}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="nroPasaporte"
          className="box"
          placeholder="Número de pasaporte"
          value={formulario.nroPasaporte}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Registrarme" className="btn" />
      </form>
    </div>
  );
};

export default RegistroHuespedForm;
