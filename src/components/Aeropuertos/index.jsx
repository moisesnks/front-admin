import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../../utils/Spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import { fetchAeropuertos } from '../../api';
import { fetchPaises, fetchCiudades } from '../../api';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import AeropuertoCard from '../AeropuertoCard'; '../PaisCard'
import './Aeropuertos.css';

export default function Aeropuertos() {
  const [aeropuertos, setAeropuertos] = useState([]);
  const [loadingAeropuertos, setLoadingAeropuertos] = useState(true);
  const [filtroPais, setFiltroPais] = useState(null);
  const [filtroCiudad, setFiltroCiudad] = useState(null);
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]); // Agregado: Lista de ciudades
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [loadingCiudades, setLoadingCiudades] = useState(true); // Agregado: Bandera de carga de ciudades
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
    const fetchData = async () => {
      try {
        setLoadingAeropuertos(true);
        const data = aeropuertosIniciales.current;

        const aeropuertosFiltrados = data.filter((aeropuerto) => {
          const cumpleFiltroPais = filtroPais === null || filtroPais.length === 0 || filtroPais.includes(aeropuerto.pais_id);
          const cumpleFiltroCiudad = filtroCiudad === null || filtroCiudad.length === 0 || filtroCiudad.includes(aeropuerto.ciudad_id);
          return cumpleFiltroPais && cumpleFiltroCiudad;
        });

        setAeropuertos(aeropuertosFiltrados);

        if (filtroPais && filtroPais.length > 0) {
          const ciudadesData = await fetchCiudades();
          // Filtrar las ciudades por el país seleccionado
          const ciudadesFiltradas = ciudadesData.filter((ciudad) => filtroPais.includes(ciudad.pais_id));
          setCiudades(ciudadesFiltradas);
        } else {
          // Si no hay país seleccionado, ciudades se mantiene vacío
          setCiudades([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingAeropuertos(false);
        setLoadingCiudades(false);
      }
    };

    fetchData();
  }, [filtroPais, filtroCiudad]);





  const handleFiltroPais = (paisId) => {
    setFiltroPais(paisId);
    setBotonPresionado(paisId);
    setFiltroCiudad(null);

  };

  const handleFiltroCiudad = (ciudadId) => {
    console.log("se seteo la ciudad a: " + ciudadId);
    setFiltroCiudad(ciudadId);
  };


  return (
    <div>
      <div className="aeropuertos-container">
        {loadingAeropuertos && loadingPaises && loadingCiudades ? (
          <Spinner />
        ) : (
          <>
            <div className="aeropuertoTitulo">
              <h1>Administrador de Aeropuertos</h1>
            </div>
            <div className="filtro-container">
              <Typeahead
                id="typeahead-paises"
                labelKey="nombre"
                multiple
                options={[
                  { id: null, nombre: 'Todos los países' },
                  ...paises,
                ]}
                selected={paises.filter((pais) => botonPresionado !== null && (botonPresionado.includes(pais.id) || botonPresionado.includes(null)))}
                onChange={(selected) => {
                  const selectedIds = selected.map((item) => item.id);
                  handleFiltroPais(selectedIds.length > 0 ? selectedIds : null);
                }}
                placeholder="Buscar por país..."
              />

              <Typeahead
                id="typeahead-ciudades"
                labelKey="nombre"
                multiple
                options={[
                  { id: null, nombre: 'Todas las ciudades' },
                  ...ciudades.filter((ciudad) => filtroPais === null || filtroPais.includes(ciudad.pais_id))
                ]}
                selected={ciudades.filter((ciudad) => filtroCiudad !== null && (filtroCiudad.includes(ciudad.id) || filtroCiudad.includes(null)))}
                onChange={(selected) => {
                  const selectedIds = selected.map((item) => item.id);
                  // Si "Todas las ciudades" está seleccionado, pasar todas las IDs de ciudades
                  const todasLasCiudadesSelected = selectedIds.includes(null);
                  const ciudadesIds = todasLasCiudadesSelected ? ciudades.map((ciudad) => ciudad.id) : selectedIds;

                  handleFiltroCiudad(ciudadesIds.length > 0 ? ciudadesIds : null);
                }}
                placeholder="Buscar por ciudad..."
              />
            </div>

            <div className="aeropuertoLista">
              {aeropuertos.map((aeropuerto) => (
                <AeropuertoCard aeropuerto={aeropuerto} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
