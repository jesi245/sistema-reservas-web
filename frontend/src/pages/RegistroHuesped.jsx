import { useState } from 'react';
import RegistroHuespedForm from '../components/RegistroHuespedForm';
import { registrarHuesped } from '../services/authService';
import LoginHuespedModal from '../components/LoginHuespedModal';
import MensajeModal from '../components/MensajeModal';

const RegistroHuespedPage = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const [esExito, setEsExito] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const handleRegistro = async (formulario) => {
    try {
      await registrarHuesped(formulario);
      setModalMensaje('Huésped registrado con éxito.');
      setEsExito(true);
      setMostrarModal(true);
    } catch (error) {
      setModalMensaje(error.response?.data?.message || 'Error al registrar huésped.');
      setEsExito(false);
      setMostrarModal(true);
    }
  };

  const handleCerrarMensaje = () => {
    setMostrarModal(false);
    if (esExito) {
      setMostrarLogin(true);
    }
  };

  return (
    <>
      <div className="background-image"></div>

      <RegistroHuespedForm onSubmit={handleRegistro} />

      <MensajeModal
        show={mostrarModal}
        mensaje={modalMensaje}
        onClose={handleCerrarMensaje}
      />

      <LoginHuespedModal
        show={mostrarLogin}
        onClose={() => setMostrarLogin(false)}
      />
    </>
  );
};

export default RegistroHuespedPage;
