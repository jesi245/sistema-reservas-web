import React, { useState } from 'react';
import './ReservasActuales.css'; 

const PreciosDinamicos = () => {
  const [reglas, setReglas] = useState([
    {
      tipo: "Temporada",
      condicion: "Julio y Enero",
      modificador: "+20%",
      activa: true,
    },
    {
      tipo: "Demanda",
      condicion: "Ocupación > 80%",
      modificador: "+15%",
      activa: false,
    },
    {
      tipo: "Temporada",
      condicion: "Diciembre (Navidad/Año Nuevo)",
      modificador: "+30%",
      activa: false,
    },
  ]);

  const toggleRegla = (index) => {
    const nuevasReglas = [...reglas];
    nuevasReglas[index].activa = !nuevasReglas[index].activa;
    setReglas(nuevasReglas);
  };

  return (
    <div className="precios-dinamicos-container">
      <h2>Motor de Precios Dinámicos</h2>
      <table className="tabla-reglas">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Condición</th>
            <th>Modificador</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reglas.map((regla, i) => (
            <tr key={i}>
              <td>{regla.tipo}</td>
              <td>{regla.condicion}</td>
              <td>{regla.modificador}</td>
              <td>{regla.activa ? 'Activa' : 'Inactiva'}</td>
              <td>
                <button onClick={() => toggleRegla(i)}>
                  {regla.activa ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreciosDinamicos;
