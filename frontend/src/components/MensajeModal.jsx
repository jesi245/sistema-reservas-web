import React from 'react';
import './MensajeModal.css';

const MensajeModal = ({ show, mensaje, onClose, esConfirmacion = false, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>{mensaje}</h3>
        <div className="modal-botones">
          {esConfirmacion ? (
            <>
              <button className='btn-aceptar' onClick={onConfirm}>Aceptar</button>
              <button className='btn-cancelar' onClick={onClose}>Cancelar</button>
            </>
          ) : (
            <button onClick={onClose}>Cerrar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MensajeModal;
