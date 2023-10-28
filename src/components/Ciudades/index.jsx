import React, { useState, useEffect } from 'react';
import './Ciudades.css';
import Spinner from '../../utils/Spinner'; // Asegúrate de importar el Spinner desde la ubicación correcta

export default function Ciudades() {
  const [ciudades, setCiudades] = useState([]);
  const [loadingCiudades, setLoadingCiudades] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/all_ciudades`);
        const data = await response.json();
        setCiudades(data);
        setLoadingCiudades(false); // Indica que la carga ha terminado
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingCiudades(false); // En caso de error, también indica que la carga ha terminado
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loadingCiudades ? (
        <div>
          <Spinner />
        </div>
      ) : (
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
      )}
    </div>
  );
};
