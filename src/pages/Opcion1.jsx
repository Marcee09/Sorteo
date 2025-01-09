import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Opcion1.css';

const PrimerOpcion = () => {
  const [formData, setFormData] = useState({
    nombreSorteo: '',
    cantidadGanadores: 1,
    cantidadSuplentes: 0,
    nombres: [],
    nombresTxt: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'nombresTxt') {
      setFormData(prev => ({
        ...prev,
        nombres: value.split('\n').filter(nombre => nombre.trim() !== '')
      }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = Math.max(0, parseInt(value) || 0);
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));
  };

  const handleArchivoCargado = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const text = await readFileContent(file);
      const nombresArray = text.split('\n').filter(nombre => nombre.trim() !== '');
      
      setFormData(prev => ({
        ...prev,
        nombres: nombresArray,
        nombresTxt: nombresArray.join('\n')
      }));
      setError('');
    } catch (err) {
      setError('Error al leer el archivo. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const validarFormulario = () => {
    if (!formData.nombreSorteo.trim()) {
      setError('Por favor, ingresa un nombre para el sorteo');
      return false;
    }
    if (formData.nombres.length === 0) {
      setError('Por favor, ingresa al menos un participante');
      return false;
    }
    if (formData.cantidadGanadores <= 0) {
      setError('La cantidad de ganadores debe ser mayor a 0');
      return false;
    }
    if (formData.cantidadGanadores + formData.cantidadSuplentes > formData.nombres.length) {
      setError('La cantidad total de ganadores y suplentes no puede superar el número de participantes');
      return false;
    }
    return true;
  };

  const handleSortear = () => {
    if (!validarFormulario()) return;

    try {
      setIsLoading(true);
      const shuffled = [...formData.nombres].sort(() => Math.random() - 0.5);
      const ganadores = shuffled.slice(0, formData.cantidadGanadores);
      const suplentes = shuffled.slice(
        formData.cantidadGanadores,
        formData.cantidadGanadores + formData.cantidadSuplentes
      );

      navigate('/ganadores', {
        state: {
          nombreSorteo: formData.nombreSorteo,
          ganadores,
          suplentes,
          totalParticipantes: formData.nombres.length
        }
      });
    } catch (err) {
      setError('Error al realizar el sorteo. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-primerOpcion">
      <div className="card-S">
        <h1>Configuración del Sorteo</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <input
          name="nombreSorteo"
          type="text"
          placeholder="Ingresa el nombre del sorteo"
          value={formData.nombreSorteo}
          onChange={handleInputChange}
        />

        <div className="input-number-group">
          <label className="labelNumber" htmlFor="cantidadGanadores">
            Cantidad de ganadores
          </label>
          <input
            id="cantidadGanadores"
            name="cantidadGanadores"
            type="number"
            min="1"
            value={formData.cantidadGanadores}
            onChange={handleNumberChange}
          />
        </div>

        <div className="input-number-group">
          <label className="labelNumber" htmlFor="cantidadSuplentes">
            Cantidad de suplentes
          </label>
          <input
            id="cantidadSuplentes"
            name="cantidadSuplentes"
            type="number"
            min="0"
            value={formData.cantidadSuplentes}
            onChange={handleNumberChange}
          />
        </div>

        <h3>Ingresa los participantes manualmente o desde un archivo</h3>
        <textarea
          name="nombresTxt"
          value={formData.nombresTxt}
          onChange={handleInputChange}
          placeholder="Escribe un nombre por línea o carga un archivo"
        />
        
        <input
          type="file"
          accept=".txt,.csv"
          onChange={handleArchivoCargado}
          disabled={isLoading}
        />

        <div className="participants-count">
          Total de participantes: {formData.nombres.length}
        </div>

        <button
          onClick={handleSortear}
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Procesando...' : 'Sortear'}
        </button>
      </div>
    </div>
  );
};

export default PrimerOpcion;



