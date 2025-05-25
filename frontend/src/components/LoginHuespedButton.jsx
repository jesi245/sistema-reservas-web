import React from "react";

const LoginButton = ({ onClick }) => {
  return (
    <a href="#login" id="login-btn" onClick={onClick}>
      Iniciar sesión
    </a>
  );
};

export default LoginButton;
