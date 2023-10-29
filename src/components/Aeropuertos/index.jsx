import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../../utils/Spinner';
import { fetchAeropuertos } from '../../api';
import { fetchPaises } from '../../api';

import './Aeropuertos.css';

export default function Aeropuertos() {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loadingAeropuertos, setLoadingAeropuertos] = useState(true);
  const [filtroPais, setFiltroPais] = useState(null);
  const [paises, setPaises] = useState([]);
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [botonPresionado, setBotonPresionado] = useState(null);
  const aeropuertosIniciales = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aeropuertosData = await fetchAeropuertos();
        const paisesData = await fetchPaises();

        aeropuertosIniciales.current = aeropuertosData;
        setAeropuertos(aeropuertosData);
        setLoadingAeropuertos(false);

        setPaises(paisesData);
        setLoadingPaises(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingAeropuertos(false);
        setLoadingPaises(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAeropuertosFiltrados = () => {
      try {
        setLoadingAeropuertos(true);
        const data = aeropuertosIniciales.current;
        const aeropuertosFiltrados = filtroPais ? data.filter((aeropuerto) => aeropuerto.pais_id === filtroPais) : data;
        setAeropuertos(aeropuertosFiltrados);
      } catch (error) {
        console.error('Error fetching aeropuertos:', error);
      } finally {
        setLoadingAeropuertos(false);
      }
    };

    fetchAeropuertosFiltrados();
  }, [filtroPais]);

  const handleFiltroPais = (paisId) => {
    setFiltroPais(paisId);
    setBotonPresionado(paisId);
  };

  return (
    <div>
      <div className="aeropuertos-container">
        {loadingAeropuertos || loadingPaises ? (
          <Spinner />
        ) : (
          <>
            <div className="filtro-container">
              {paises.map((pais) => (
                <div
                  key={pais.id}
                  className={`filtro ${botonPresionado === pais.id ? 'presionado' : ''}`}
                  onClick={() => handleFiltroPais(pais.id)}
                >
                  {pais.nombre}
                </div>
              ))}
              <div className={`filtro ${botonPresionado === null ? 'presionado' : ''}`} onClick={() => handleFiltroPais(null)}>
                Todos
              </div>
            </div>

            <div className="aeropuerto-list">
              {aeropuertos.map((aeropuerto) => (
                <div key={aeropuerto.id} className="aeropuerto">
                  <p><b> {aeropuerto.nombre} </b></p>
                  <hr></hr>
                  <p><b> Ciudad:</b> {aeropuerto.nombre_ciudad}</p>
                  <hr></hr>
                  <p><b> País: </b> {aeropuerto.nombre_pais} ({aeropuerto.abrev_pais})</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
