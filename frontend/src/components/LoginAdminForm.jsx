import React, { useState } from 'react';
import './LoginAdminForm.css'


const LoginForm = ({ onSubmit }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombreUsuario, password });
  };

  return (
    <section className='login-admin'>
      <form className='data-box' onSubmit={handleSubmit}>
        <h2>¡Bienvenido!</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className='btn' type="submit">Iniciar sesión</button>
      <p class="register-link">
        ¿Eres nuevo? <a href="registrar">Regístrate aquí</a>
    </p>
    </form>
    </section>
    
  );
};

export default LoginForm;
