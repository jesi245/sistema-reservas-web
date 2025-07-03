import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservasActuales.css';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/14D-re6m09ucSQtjpDwudNu1BWiDmhKlyYkTkVFVauHM/edit';
const GOOGLE_FORM_RESPONSES_URL =
  'https://docs.google.com/spreadsheets/d/1_J2L7kxXiEGLG9e4be9QifPr03Kt4ISSmQCHM10EqBI/edit';

const EncuestaSatisfaccion = () => {
  const [huespedes, setHuespedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHuespedes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/reservas/checkins', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Datos recibidos:', res.data); // <--- imprimir datos en consola
        setHuespedes(res.data);
      } catch (err) {
        console.error('Error al cargar huéspedes:', err);
        setError('Error al cargar huéspedes con check-in');
      } finally {
        setLoading(false);
      }
    };
    fetchHuespedes();
  }, []);

  return (
    <div className="encuesta-satisfaccion-container">
      <h2>Encuesta de Satisfacción</h2>

      <div className="encuesta-links">
        <p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-grande"
          >
            ➤ Editar encuesta de satisfacción
          </a>
        </p>
        <p>
          <a
            href={GOOGLE_FORM_RESPONSES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-grande"
          >
            📊 Ver respuestas
          </a>
        </p>
      </div>
      {/*}
      <h3>Huéspedes con check-in</h3>
      {loading && <p>Cargando huéspedes...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          {huespedes.length === 0 ? (
            <p>No hay huéspedes con check-in actualmente.</p>
          ) : (
            <table className="tabla-huespedes">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {huespedes.map(({ nombre, email }) => (
                  <tr key={email}>
                    <td>{nombre}</td>
                    <td>{email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
        */}
    </div>
  );
};

export default EncuestaSatisfaccion;







