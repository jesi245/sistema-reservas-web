import React from 'react';
import LoginAdminForm from '../components/LoginAdminForm';
import { loginAdmin } from '../services/authService';
import { useNavigate } from 'react-router-dom';


const LoginAdminPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
  try {
    const response = await loginAdmin(formData);
    
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    alert('Bienvenido/a ' + response.user.nombreUsuario);

    // Redireccionar según rol
    if (response.user.role === 'admin') {
      navigate('/api/admin/panel');
    } else {
      navigate('/huesped/reservas'); // si más adelante usás el mismo login para ambos
    }
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
