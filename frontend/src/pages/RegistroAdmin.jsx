import { useNavigate } from 'react-router-dom';
import RegistroAdminForm from '../components/RegistroAdminForm';
import { registrarAdmin } from '../services/authService';

const RegistroAdminPage = () => {
  const navigate = useNavigate();

  const handleRegistro = async (formData) => {
    try {
      const data = await registrarAdmin(formData);
      alert('Administrador registrado con éxito!');
      navigate('/api/auth/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <>
        <div className="background-image"></div>
        <RegistroAdminForm onSubmit={handleRegistro} />
    </>
  );
};

export default RegistroAdminPage;
