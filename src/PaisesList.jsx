import React, { useEffect, useState } from 'react';

function PaisesList() {
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    async function fetchPaises() {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/all_paises`;
        const response = await fetch(apiUrl);
        
        if (response.ok) {
          const data = await response.json();
          setPaises(data);
        } else {
          console.error('Error al obtener datos');
        }
      } catch (error) {
        console.error('Error de red', error);
      }
    }

    fetchPaises();
  }, []);

  return (
    <div>
      <h1>Lista de Países jajaajja</h1>
      <ul>
        {paises.map((pais) => (
          <li key={pais.id}>
            {pais.nombre} - {pais.abreviacion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaisesList;
