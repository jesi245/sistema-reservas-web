// LoginHuespedModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginHuespedForm.css";

const LoginHuespedModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Aquí iría el login real
  };

  if (!show) return null;

  return (
    <div className="login-form-container active">
      <i className="fas fa-times" id="form-close" onClick={onClose}></i>

      <form id="login-form" onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>
        <input
          type="email"
          name="email"
          className="box"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="box"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Ingresar" className="btn" />
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Recordar Contraseña</label>
        <p>¿Olvidaste tu contraseña? <a href="#">Click aquí</a></p>
        <p>¿Aún no tienes una cuenta? <a href="#" onClick={() => navigate("api/auth/registrar-huesped")}>Registrarme</a></p>
      </form>
    </div>
  );
};

export default LoginHuespedModal;
