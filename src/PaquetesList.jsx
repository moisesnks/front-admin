import React, { useState, useEffect } from 'react';

const PaquetesList = () => {
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    async function fetchPaquetes() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL + '/all_paquetes';
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setPaquetes(data);
        } else {
          console.error('Error al obtener los paquetes');
        }
      } catch (error) {
        console.error('Error al obtener los paquetes:', error);
      }
    }
  
    fetchPaquetes();
  }, []);

  return (
    <div>
      <h1>Lista de Paquetes</h1>
      <ul>
        {paquetes.map((paquete) => (
          <li key={paquete.id}>{paquete.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default PaquetesList;
