import React, { useEffect, useState } from 'react';
import './Paises.css';
import Spinner from '../../utils/Spinner';

export default function Paises() {
  const [paises, setPaises] = useState([]);
  const [loadingPaises, setLoadingPaises] = useState(true);

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
      } finally {
        setLoadingPaises(false); // Indica que la carga ha terminado, ya sea con éxito o error
      }
    }

    fetchPaises();
  }, []);

  return (
    <div>
      {loadingPaises ? (
        <Spinner />
      ) : (
        <>
          <h1>Lista de Países</h1>
          <ul>
            {paises.map((pais) => (
              <li key={pais.id}>
                {pais.nombre} - {pais.abreviacion}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
