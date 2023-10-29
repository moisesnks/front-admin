// src/components/Paises/index.jsx
import React, { useEffect, useState } from 'react';
import './Paises.css';
import Spinner from '../../utils/Spinner';
import { fetchPaises } from '../../api';

export default function Paises() {
  const [paises, setPaises] = useState([]);
  const [loadingPaises, setLoadingPaises] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPaises();
        setPaises(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingPaises(false);
      }
    };

    fetchData();
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
