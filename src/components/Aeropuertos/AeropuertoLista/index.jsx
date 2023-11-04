import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../../../utils/Spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import { fetchPaises, fetchCiudades } from '../../../api';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import AeropuertoCard from '../AeropuertoCard';
import './AeropuertoLista.css';

export default function AeropuertoLista({
  aeropuertos,
  selectedAeropuertos,
  onCardClick,
  paises,
  ciudades,
  filtroPais,
  filtroCiudad,
  botonPresionado,
  handleFiltroPais,
  handleFiltroCiudad,

}) {

  const handlePaisTypeaheadChange = (selected) => {
    const selectedIds = selected.map((item) => item.id);
    handleFiltroPais(selectedIds.length > 0 ? selectedIds : null);
  };

  const handleCiudadTypeaheadChange = (selected) => {
    const selectedIds = selected.map((item) => item.id);
    const todasLasCiudadesSelected = selectedIds.includes(null);
    const ciudadesIds = todasLasCiudadesSelected ? ciudades.map((ciudad) => ciudad.id) : selectedIds;

    handleFiltroCiudad(ciudadesIds.length > 0 ? ciudadesIds : null);
  };

  return (
    <div>
      <div className="aeropuertos-container">
        <div className="filtro-container">
          <div className="filtro-pais">
            <Typeahead
              id="typeahead-paises"
              labelKey="nombre"
              multiple
              options={[
                { id: null, nombre: 'Todos los países' },
                ...paises,
              ]}
              selected={paises.filter((pais) => botonPresionado !== null && (botonPresionado.includes(pais.id) || botonPresionado.includes(null)))}
              onChange={handlePaisTypeaheadChange}
              placeholder="Buscar por país..."
            />
          </div>
          <div className="filtro-ciudad">
            <Typeahead
              id="typeahead-ciudades"
              labelKey="nombre"
              multiple
              options={[
                { id: null, nombre: 'Todas las ciudades' },
                ...ciudades.filter((ciudad) => filtroPais === null || filtroPais.includes(ciudad.pais_id))
              ]}
              selected={ciudades.filter((ciudad) => filtroCiudad !== null && (filtroCiudad.includes(ciudad.id) || filtroCiudad.includes(null)))}
              onChange={handleCiudadTypeaheadChange}
              placeholder="Buscar por ciudad..."
            />
          </div>
        </div>

        <div className="aeropuertoLista">
          {aeropuertos.map((aeropuerto) => (
            <AeropuertoCard
              key={aeropuerto.id}
              aeropuerto={aeropuerto}
              onCardClick={onCardClick}
              selectedAeropuertos={selectedAeropuertos} // Pasa el estado como prop

            />
          ))}
        </div>
      </div>
    </div>
  );
}
