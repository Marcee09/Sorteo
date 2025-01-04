import React, { useState } from 'react';
import './Opcion1.css';

const PrimerOpcion = () => {
  const [nombres, setNombres] = useState([]);
  const [cantidadGanadores, setCantidadGanadores] = useState(0);
  const [cantidadSuplentes, setCantidadSuplentes] = useState(0);
  const [resultado, setResultado] = useState({ ganadores: [], suplentes: [] });

  const handleNombresChange = (e) => {
    setNombres(e.target.value.split('\n')); // Divide los nombres por líneas
  };

  const handleArchivoCargado = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setNombres(text.split('\n').filter((nombre) => nombre.trim() !== ''));
    };
    reader.readAsText(file);
  };

  const handleSortear = () => {
    if (nombres.length === 0) {
      alert('Por favor, ingresa nombres antes de sortear.');
      return;
    }

    const shuffled = [...nombres].sort(() => Math.random() - 0.5); 
    const ganadores = shuffled.slice(0, cantidadGanadores);
    const suplentes = shuffled.slice(cantidadGanadores, cantidadGanadores + cantidadSuplentes);

    setResultado({ ganadores, suplentes });
  };

  return (
    <div className="container-primerOpcion">
        <div className='card-S'>
            <input name="nombre" type="text" placeholder="Ingresa el nombre del sorteo" />
            <div className="input-number-group">
                <label className='labelNumber' htmlFor="ganadores">Cantidad de ganadores</label>
                <input
                    id="ganadores"
                    type="number"
                    value={cantidadGanadores}
                    onChange={(e) => setCantidadGanadores(Number(e.target.value))}
                />
            </div>

            <div className="input-number-group">
                <label className='labelNumber' htmlFor="suplentes">Cantidad de suplentes</label>
                <input
                    id="suplentes"
                    type="number"
                    value={cantidadSuplentes}
                    onChange={(e) => setCantidadSuplentes(Number(e.target.value))}
                />
            </div>
            <h3>Ingresa los nombres manualmente o desde  un archivo</h3>
            <textarea
                value={nombres.join('\n')}
                onChange={handleNombresChange}
                placeholder="Escribe un nombre por línea o carga un archivo"
            />
            <input type="file" accept=".txt,.csv" onChange={handleArchivoCargado} />
            <button onClick={handleSortear}>Sortear</button>

            <div className="resultados">
                <h3>Ganadores</h3>
                <ul>
                {resultado.ganadores.map((nombre, index) => (
                    <li key={index}>{nombre}</li>
                ))}
                </ul>
                <h3>Suplentes</h3>
                <ul>
                {resultado.suplentes.map((nombre, index) => (
                    <li key={index}>{nombre}</li>
                ))}
                </ul>
            </div>
        </div>
    </div>
  );
};

export default PrimerOpcion;


