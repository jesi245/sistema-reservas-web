import { useNavigate } from 'react-router-dom';
import RegistroHuespedForm from '../components/RegistroHuespedForm';
import { registrarHuesped } from '../services/authService';

const RegistroHuespedPage = () => {
  const navigate = useNavigate();

  const handleRegistro = async (formulario) => {
    try {
      await registrarHuesped(formulario);
      alert('Huésped registrado con éxito.');
      navigate('/api/auth/login'); // O a donde quieras redirigir
    } catch (error) {
      alert(error.response?.data?.message || 'Error al registrar huésped.');
    }
  };

  return (
    <>
      <div className="background-image"></div>
      <RegistroHuespedForm onSubmit={handleRegistro} />
    </>
  );
};

export default RegistroHuespedPage;