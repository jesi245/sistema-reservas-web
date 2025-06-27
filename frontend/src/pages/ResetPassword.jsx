import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  

  //const params = new URLSearchParams(location.search);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { token, nuevaPassword: password });
      setMensaje(response.data.message);
      setTimeout(() => navigate('/'), 3000); // Redirige después de 3 seg
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar la contraseña');
    }
  };

  return (
    <div className="login-form-container active">
      <form onSubmit={handleSubmit}>
        <h3>Restablecer contraseña</h3>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="password"
          className="box"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input type="submit" className="btn" value="Guardar nueva contraseña" />
      </form>
    </div>
  );
};

export default ResetPassword;
