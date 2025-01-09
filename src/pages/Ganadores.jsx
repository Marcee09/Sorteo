import React from 'react';
import './Ganadores.css'; // Archivo CSS para confeti y diseño
import { useLocation } from 'react-router-dom';

const Ganadores = () => {
  const location = useLocation();
  const { ganadores, suplentes } = location.state || { ganadores: [], suplentes: [] };

  return (
      <div className="confetti">
        <div className='card-S'>
          <h1 className="felicidades">¡Felicidades a los Ganadores!</h1>
          <div className='resultados'>
          <h3>Ganadores</h3>
          <ul>
            {ganadores.map((nombre, index) => (
              <li key={index}>{nombre}</li>
            ))}
          </ul>
          <h3>Suplentes</h3>
          <ul>
            {suplentes.map((nombre, index) => (
              <li key={index}>{nombre}</li>
            ))}
          </ul>
          </div>
          </div>
        </div>
      
  );
};

export default Ganadores;
