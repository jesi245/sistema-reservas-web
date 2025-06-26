import { useState } from 'react';
import RegistroHuespedForm from '../components/RegistroHuespedForm';
import { registrarHuesped } from '../services/authService';
import LoginHuespedModal from '../components/LoginHuespedModal'; // Importá el modal


const RegistroHuespedPage = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleRegistro = async (formulario) => {
    try {
      await registrarHuesped(formulario)
      alert('Huésped registrado con éxito.')
      setMostrarModal(true)
    } catch (error) {
      alert(error.response?.data?.message || 'Error al registrar huésped.');
    }
  };

  return (
    <>
      <div className="background-image"></div>

      <RegistroHuespedForm onSubmit={handleRegistro} />

      {/* Login Modal que se abre al registrarse */}
      <LoginHuespedModal show={mostrarModal} onClose={() => setMostrarModal(false)} />
    </>
  );
};

export default RegistroHuespedPage;
