
import React from 'react';
import './Ganadores.css';
import { useLocation } from 'react-router-dom';

const Ganadores = () => {
  const location = useLocation();
  const { ganadores = [], suplentes = [] } = location.state || {};

  return (
    <div className="winners-container">
      <div className="confetti-overlay"></div>
      
      <div className="winners-card">
        <div className="card-header">
          <h1>¡Felicidades a los Ganadores!</h1>
        </div>
        
        <div className="card-content">
          <div className="section">
            <h2>Ganadores</h2>
            <ul>
              {ganadores.map((nombre, index) => (
                <li key={index} className="winner-item">
                  {nombre}
                </li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>Suplentes</h2>
            <ul>
              {suplentes.map((nombre, index) => (
                <li key={index} className="substitute-item">
                  {nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ganadores;
