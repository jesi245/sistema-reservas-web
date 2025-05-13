import React from 'react';
import FiltroBuscar from '../components/FiltroBuscar';

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--color-fondo)',
        padding: '2rem'
      }}
    >
    
      <FiltroBuscar />
    </div>
  );
};

export default Home;


