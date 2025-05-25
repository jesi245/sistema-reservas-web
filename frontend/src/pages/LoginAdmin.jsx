import React from 'react';
import LoginAdminForm from '../components/LoginAdminForm';
import { loginAdmin } from '../services/authService';
import { useNavigate } from 'react-router-dom';


const LoginAdminPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await loginAdmin(formData);
      alert('Bienvenido/a ' + response.user.nombreUsuario);
      navigate('/admin/panel');
    } catch (error) {
      alert(error.response?.data?.message || 'Error en el login');
    }
  };

  return (
    <>
      <div className='background-image'></div>
      <LoginAdminForm onSubmit={handleLogin} />
    </>
  );
};

export default LoginAdminPage;
