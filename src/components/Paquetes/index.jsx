// src/components/Paquetes/index.jsx
import React, { useEffect, useState } from 'react';
import './Paquetes.css';
import Spinner from '../../utils/Spinner';
import { fetchPaquetes } from '../../api';

export default function Paquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [loadingPaquetes, setLoadingPaquetes] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPaquetes();
        setPaquetes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingPaquetes(false);
      }
    };

    fetchData();
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
