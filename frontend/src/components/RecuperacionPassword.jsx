// src/components/RecuperacionPassword.jsx
import React, { useState } from "react";
import { enviarLinkRecuperacion } from "../services/authService";

const RecuperacionPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const res = await enviarLinkRecuperacion({ email });
      setMensaje(res.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el correo');
    }
  };

  return (
    <div className="login-form-container active">
      <form onSubmit={handleSubmit}>
        <h3>Recuperar contraseña</h3>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          className="box"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="submit" value="Enviar link de recuperación" className="btn" />

        <p style={{ marginTop: '1rem' }}>
          <a href="#" onClick={onBack}>Volver al inicio de sesión</a>
        </p>
      </form>
    </div>
  );
};

export default RecuperacionPassword;
