import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Opcion3.css';

const TerceraOpcion = () => {
  const [formData, setFormData] = useState({
    nombreSorteo: '',
    cantidadGanadores: 1,
    cantidadSuplentes: 0,
    rangoDesde: 1,
    rangoHasta: 10
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = name !== 'nombreSorteo' ? Math.floor(Number(value)) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));

    // Limpiar error al modificar cualquier campo
    setError('');
  };

  const validarFormulario = () => {
    const { nombreSorteo, cantidadGanadores, cantidadSuplentes, rangoDesde, rangoHasta } = formData;

    if (!nombreSorteo.trim()) {
      setError('Por favor, ingresa un nombre para el sorteo');
      return false;
    }

    if (rangoDesde < 0 || rangoHasta < 0) {
      setError('Los números no pueden ser negativos');
      return false;
    }

    if (rangoHasta <= rangoDesde) {
      setError('El número "Hasta" debe ser mayor que el número "Desde"');
      return false;
    }

    if (cantidadGanadores <= 0) {
      setError('La cantidad de ganadores debe ser mayor a 0');
      return false;
    }

    const totalNumeros = rangoHasta - rangoDesde + 1;
    const totalSeleccionados = cantidadGanadores + cantidadSuplentes;

    if (totalSeleccionados > totalNumeros) {
      setError('La cantidad total de ganadores y suplentes no puede superar la cantidad de números disponibles');
      return false;
    }

    return true;
  };

  const generarNumerosUnicos = (desde, hasta, cantidad) => {
    const numeros = Array.from(
      { length: hasta - desde + 1 },
      (_, i) => desde + i
    );
    
    // Algoritmo Fisher-Yates para mezclar el array
    for (let i = numeros.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }

    return numeros.slice(0, cantidad);
  };

  const handleSortear = () => {
    if (!validarFormulario()) return;

    try {
      setIsLoading(true);
      const { nombreSorteo, cantidadGanadores, cantidadSuplentes, rangoDesde, rangoHasta } = formData;
      
      const numerosSeleccionados = generarNumerosUnicos(
        rangoDesde,
        rangoHasta,
        cantidadGanadores + cantidadSuplentes
      );

      const ganadores = numerosSeleccionados.slice(0, cantidadGanadores);
      const suplentes = numerosSeleccionados.slice(cantidadGanadores);

      navigate('/ganadores', {
        state: {
          nombreSorteo,
          ganadores,
          suplentes,
          tipo: 'números',
          rangoDesde,
          rangoHasta
        }
      });
    } catch (err) {
      setError('Error al realizar el sorteo. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-number-raffle">
      <div className="card-raffle">
        <h1>Sorteo de Números</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <input
          name="nombreSorteo"
          type="text"
          placeholder="Nombre del sorteo"
          value={formData.nombreSorteo}
          onChange={handleInputChange}
          className="input-text"
        />

        <div className="number-inputs-section">
          <h3>Cantidad de números a sortear</h3>
          
          <div className="input-number-group">
            <label className="labelNumber" htmlFor="cantidadGanadores">
              Ganadores
            </label>
            <input
              id="cantidadGanadores"
              name="cantidadGanadores"
              type="number"
              min="1"
              value={formData.cantidadGanadores}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-number-group">
            <label className="labelNumber" htmlFor="cantidadSuplentes">
              Suplentes
            </label>
            <input
              id="cantidadSuplentes"
              name="cantidadSuplentes"
              type="number"
              min="0"
              value={formData.cantidadSuplentes}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="range-section">
          <h3>Rango de números</h3>
          <div className="range-inputs">
            <div className="range-input-group">
              <label htmlFor="rangoDesde">Desde</label>
              <input
                id="rangoDesde"
                name="rangoDesde"
                type="number"
                value={formData.rangoDesde}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="range-divider">hasta</div>
            
            <div className="range-input-group">
              <label htmlFor="rangoHasta">Hasta</label>
              <input
                id="rangoHasta"
                name="rangoHasta"
                type="number"
                value={formData.rangoHasta}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="numbers-available">
            Números disponibles: {Math.max(0, formData.rangoHasta - formData.rangoDesde + 1)}
          </div>
        </div>

        <button
          onClick={handleSortear}
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Procesando...' : 'Realizar Sorteo'}
        </button>
      </div>
    </div>
  );
};

export default TerceraOpcion;