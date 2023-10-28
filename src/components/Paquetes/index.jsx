import React, { useState, useEffect } from 'react';
import './Paquetes.css';
import Spinner from '../../utils/Spinner';

export default function Paquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [loadingPaquetes, setLoadingPaquetes] = useState(true);

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
      } finally {
        setLoadingPaquetes(false); // Indica que la carga ha terminado, ya sea con éxito o error
      }
    }

    fetchPaquetes();
  }, []);

  return (
    <div>
      {loadingPaquetes ? (
        <Spinner />
      ) : (
        <>
          <h1>Lista de Paquetes</h1>
          <ul>
            {paquetes.map((paquete) => (
              <li key={paquete.id}>{paquete.nombre}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
