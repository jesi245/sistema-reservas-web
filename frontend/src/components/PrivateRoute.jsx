import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Sin token o sin datos del usuario → redirigir al login
  if (!token || !user) {
    return <Navigate to="/api/auth/login-admin" />;
  }

  // Si hay restricción de rol y el usuario no lo cumple → redirigir
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  // Todo OK → renderizar la ruta protegida
  return children;
};

export default PrivateRoute;
