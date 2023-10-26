// Archivo AeropuertosList.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './Aeropuertos.css';
import Spinner from './Spinner';

const AeropuertosList = () => {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loadingAeropuertos, setLoadingAeropuertos] = useState(true);
  const [filtroPais, setFiltroPais] = useState(null);
  const [paises, setPaises] = useState([]);
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [botonPresionado, setBotonPresionado] = useState(null);
  const aeropuertosIniciales = useRef([]);

  useEffect(() => {
    const fetchDataAeropuertos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all_aeropuertos`);
        aeropuertosIniciales.current = response.data;
        setAeropuertos(response.data);
        setLoadingAeropuertos(false);
      } catch (error) {
        console.error('Error fetching aeropuertos:', error);
        setLoadingAeropuertos(false);
      }
    };

    const fetchDataPaises = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all_paises`);
        setPaises(response.data);
        setLoadingPaises(false);
      } catch (error) {
        console.error('Error fetching paises:', error);
        setLoadingPaises(false);
      }
    };

    fetchDataAeropuertos();
    fetchDataPaises();
  }, []); // Se ejecutará una vez al montar el componente

  useEffect(() => {
    const fetchAeropuertosFiltrados = async () => {
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
};

export default AeropuertosList;
