import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistroAdminForm.css'

const RegistroAdminForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombreHotel: '',
    nombreUsuario: '',
    password: '',
    role: 'huesped',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className='registro-admin'>
      
      <form className='register-box' onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>
        
        <input type="text" name="nombreHotel" placeholder='Nombre del Hotel' value={formData.nombreHotel} onChange={handleChange} required />
      
        <input type="text" name="nombreUsuario" placeholder='Nombre de Usuario' value={formData.nombreUsuario} onChange={handleChange} required />
      
        <input type="password" name="password" placeholder='Contraseña' value={formData.password} onChange={handleChange} required />

        <button className='btn' type="submit">Registrarse</button>
        
        <p className="register-link">
          ¿Ya tienes cuenta? <Link to="/api/auth/login-admin">Iniciar sesión</Link>
        </p>
      </form>
    </section>
  );
};

export default RegistroAdminForm;
