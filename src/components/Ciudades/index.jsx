// src/components/Ciudades/index.jsx
import React, { useState, useEffect } from 'react';
import './Ciudades.css';
import Spinner from '../../utils/Spinner';
import { fetchCiudades } from '../../api';

export default function Ciudades() {
  const [ciudades, setCiudades] = useState([]);
  const [loadingCiudades, setLoadingCiudades] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCiudades();
        setCiudades(data);
        setLoadingCiudades(false);
      } catch (error) {
        setLoadingCiudades(false);
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
}
