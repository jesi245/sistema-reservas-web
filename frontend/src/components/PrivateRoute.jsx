import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔒 Si no hay token o user en localStorage, redirigir al login adecuado
  if (!token || !user) {
    if (allowedRole === 'admin') {
      return <Navigate to="/api/auth/login-admin" />;
    } else if (allowedRole === 'huesped') {
      return <Navigate to="/" />;
    }
    return <Navigate to="/" />;
  }

  // ⚠️ Si tiene token, pero no el rol correcto
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  // Renderizar los hijos
  return children;
};

export default PrivateRoute;

