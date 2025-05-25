import React, { useState } from 'react';
import FiltroBuscar from '../components/FiltroBuscar';
import LoginButton from '../components/LoginHuespedButton';
import LoginModal from '../components/LoginHuespedModal';
import '../pages/Home.css';
import videoBackGround from '../assets/videos/background.mp4';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginOpen = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <header>
        <a href="#" className="logo">
          <span>KJ</span> Web
        </a>
        <nav className="navbar">
          <a href="#checkin">Check In</a>
          <LoginButton onClick={handleLoginOpen} />
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
