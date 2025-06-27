import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHuesped } from "../services/authService";
import "./LoginHuespedForm.css";

const LoginHuespedModal = ({ show, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ nombreHuesped: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await loginHuesped(credenciales);

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('huesped', JSON.stringify(response.huesped));

    alert('Bienvenido/a ' + response.huesped.nombreHuesped);

    onClose();

    // ✅ Si hay una redirección personalizada, se ejecuta
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      // ✅ Flujo normal
      navigate('/api/huesped/panel');
    }

  } catch (err) {
    setError(err.response?.data?.message || 'Error al iniciar sesión');
  }
};

  if (!show) return null;

  return (
    <div className="login-form-container active">
      <i className="fas fa-times" id="form-close" onClick={onClose}></i>

      <form id="login-form" onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="text"
          name="nombreHuesped"
          className="box"
          placeholder="Ingresá tu nombre"
          value={credenciales.nombreHuesped}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="box"
          placeholder="Contraseña"
          value={credenciales.password}
          onChange={handleChange}
        />
        <input type="submit" value="Ingresar" className="btn" />
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Recordar Contraseña</label>
        <p>¿Olvidaste tu contraseña? <a href="#">Click aquí</a></p>
        <p>¿Aún no tienes una cuenta? <a href="#" onClick={() => navigate("/api/auth/registrar-huesped")}>Registrarme</a></p>
      </form>
    </div>
  );
};

export default LoginHuespedModal;
