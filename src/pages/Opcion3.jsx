import React, { useState } from 'react';
import './Opcion3.css';

const TerceraOpcion = () => {
  const [cantidadGanadores, setCantidadGanadores] = useState(0);
  const [cantidadSuplentes, setCantidadSuplentes] = useState(0);
  const [rangoDesde, setRangoDesde] = useState(0);
  const [rangoHasta, setRangoHasta] = useState(0);
  const [resultado, setResultado] = useState({ ganadores: [], suplentes: [] });

  const handleSortear = () => {
    if (rangoDesde < 0 || rangoHasta < 0 || rangoHasta <= rangoDesde) {
      alert('Por favor, ingrese un rango válido (Desde menor que Hasta y sin números negativos).');
      return;
    }

    if (cantidadGanadores + cantidadSuplentes > rangoHasta - rangoDesde + 1) {
      alert('El total de ganadores y suplentes no puede superar el tamaño del rango.');
      return;
    }

    // Crear el rango de números
    const numeros = Array.from(
      { length: rangoHasta - rangoDesde + 1 },
      (_, i) => rangoDesde + i
    );

    // Mezclar números
    const numerosMezclados = [...numeros].sort(() => Math.random() - 0.5);

    // Obtener ganadores y suplentes
    const ganadores = numerosMezclados.slice(0, cantidadGanadores);
    const suplentes = numerosMezclados.slice(
      cantidadGanadores,
      cantidadGanadores + cantidadSuplentes
    );

    setResultado({ ganadores, suplentes });
  };

  return (
    <div className="container-primerOpcion">
      <div className="card-S">
        <h1>Opciones</h1>
        <input name="nombre" type="text" placeholder="Ingresa el nombre del sorteo" />
        <div className="input-number-group">
          <label className="labelNumber" htmlFor="ganadores">Cantidad de ganadores</label>
          <input
            id="ganadores"
            type="number"
            value={cantidadGanadores}
            onChange={(e) => setCantidadGanadores(Number(e.target.value))}
          />
        </div>
        <div className="input-number-group">
          <label className="labelNumber" htmlFor="suplentes">Cantidad de suplentes</label>
          <input
            id="suplentes"
            type="number"
            value={cantidadSuplentes}
            onChange={(e) => setCantidadSuplentes(Number(e.target.value))}
          />
        </div>
        <h3>Elige el rango de números a sortear</h3>
        <div className="input-number-group">
          <label className="labelNumber" htmlFor="rangoDesde">Desde</label>
          <input
            id="rangoDesde"
            type="number"
            value={rangoDesde}
            onChange={(e) => setRangoDesde(Number(e.target.value))}
          />
          <label className="labelNumber" htmlFor="rangoHasta">Hasta</label>
          <input
            id="rangoHasta"
            type="number"
            value={rangoHasta}
            onChange={(e) => setRangoHasta(Number(e.target.value))}
          />
        </div>
        <button onClick={handleSortear}>Sortear</button>
        <div className="resultados">
          <h3>Ganadores</h3>
          <ul>
            {resultado.ganadores.map((numero, index) => (
              <li key={index}>{numero}</li>
            ))}
          </ul>
          <h3>Suplentes</h3>
          <ul>
            {resultado.suplentes.map((numero, index) => (
              <li key={index}>{numero}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TerceraOpcion;