import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHuesped } from "../services/authService";
import "./LoginHuespedForm.css";
import { useEffect } from "react";
import RecuperarPassword from "./RecuperacionPassword";

const LoginHuespedModal = ({ show, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  useEffect(() => {
    const savedCreds = JSON.parse(localStorage.getItem('rememberedCreds'));
      if (savedCreds) {
        setCredenciales(savedCreds);
        setRememberMe(true);
      }
  }, []);

  const handleRememberChange = (e) => {
    setRememberMe(e.target.checked);
  };

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

    // Guardar o limpiar credenciales
    if (rememberMe) {
      localStorage.setItem('rememberedCreds', JSON.stringify(credenciales));
    } else {
      localStorage.removeItem('rememberedCreds');
    }

    onClose();

    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      navigate('/api/huesped/panel');
    }

  } catch (err) {
    setError(err.response?.data?.message || 'Error al iniciar sesión');
  }
};


  if (!show) return null;

  if (showRecovery) {
  return <RecuperarPassword onBack={() => setShowRecovery(false)} />;
}


  return (
    <div className="login-form-container active">
      <i className="fas fa-times" id="form-close" onClick={onClose}></i>

      <form id="login-form" onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="text"
          name="email"
          className="box"
          placeholder="Ingresá tu email"
          value={credenciales.email}
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
        <div style={{ marginTop: '1rem' }}>
          <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={handleRememberChange}
        />
        <label htmlFor="remember">Recordar contraseña</label>
        </div>

        <p>
          ¿Olvidaste tu contraseña?{' '}
          <a href="#" onClick={() => setShowRecovery(true)}>Click aquí</a>
        </p>
        <p>¿Aún no tienes una cuenta? <a href="#" onClick={() => navigate("/api/auth/registrar-huesped")}>Registrarme</a></p>
      </form>
    </div>
  );
};

export default LoginHuespedModal;
