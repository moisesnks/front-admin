import React, { useState, useEffect } from 'react';

const CiudadesList = () => {
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    // Realizar la solicitud fetch al servidor local
    fetch('http://localhost:9090/all_ciudades')
      .then((response) => response.json())
      .then((data) => setCiudades(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Ciudades</h2>
      <ul>
        {ciudades.map((ciudad) => (
          <li key={ciudad.id}>
            {ciudad.nombre} - {ciudad.nombre_pais} ({ciudad.abrev_pais})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CiudadesList;
