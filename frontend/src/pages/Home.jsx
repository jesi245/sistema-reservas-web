import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FiltroBuscar from '../components/FiltroBuscar';
import LoginButton from '../components/LoginHuespedButton';
import LoginModal from '../components/LoginHuespedModal';
import '../pages/Home.css';
import videoBackGround from '../assets/videos/background.mp4';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [huesped, setHuesped] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHuesped = JSON.parse(localStorage.getItem('huesped'));
    if (storedHuesped) {
      setHuesped(storedHuesped);
    }
  }, []);

  const handleLoginOpen = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setHuesped(null);
    window.location.reload();
  };

  return (
    <div>
      <header>
        <a href="#" className="logo">
          <span>KJ</span> Web
        </a>
        <nav className="navbar">
          {huesped ? (
            <>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/api/huesped/panel'); 
                }}
                style={{ marginRight: '1rem' }}
              >
                {huesped.nombreHuesped || 'Huésped'}
              </a>
              <a href="#" onClick={handleLogout}>
                Cerrar Sesión
              </a>
            </>
          ) : (
            <LoginButton onClick={handleLoginOpen} />
          )}
        </nav>
      </header>

      <LoginModal show={showLogin} onClose={handleLoginClose} />

      <section className="home" id="home">
        <div className="video-container">
          <video src={videoBackGround} id="video-slider" loop autoPlay muted></video>
        </div>
      </section>

      <FiltroBuscar />
    </div>
  );
};

export default Home;
