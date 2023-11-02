import React, { useEffect, useState } from 'react';
import './Paises.css';
import Spinner from '../../utils/Spinner';
import { fetchPaises } from '../../api';
import PaisCard from '../PaisCard';

export default function Paises() {
  const [paises, setPaises] = useState([]);
  const [filteredPaises, setFilteredPaises] = useState([]); // Estado para los países filtrados
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPaises();
        setPaises(data);
        setFilteredPaises(data); // Inicialmente, los países filtrados son iguales a los países originales
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingPaises(false);
      }
    };

    fetchData();
  }, []);

  function handleBuscar() {
    const term = searchTerm.toLowerCase();

    if (term === '') {
      // Restaurar la lista original cuando el término de búsqueda esté vacío
      setFilteredPaises(paises);
    } else {
      const filteredPaises = paises.filter((pais) => {
        const nombreSinTildes = pais.nombre
          .normalize('NFD') // Normaliza las tildes a caracteres individuales
          .replace(/[\u0300-\u036f]/g, ''); // Elimina los caracteres diacríticos (tildes)

        return (
          nombreSinTildes.toLowerCase().includes(term) || pais.abreviacion.toLowerCase().includes(term)
        );
      });
      setFilteredPaises(filteredPaises);
    }
  }

  function handleCrear() {
    console.log('Boton Crear Presionado');
  }

  function handleEditar() {
    console.log('Boton Editar Presionado');
  }

  function handleBorrar() {
    console.log('Boton Borrar Presionado');
  }

  return (
    <div>
      {loadingPaises ? (
        <Spinner />
      ) : (
        <>
          <div className="paisTitulo">
            <h1>Administrador de Paises</h1>
          </div>
          <div className="paisContenido">
            <div className="paisIzquierda">
              <div className="paisBuscar paisCaja">
                <input
                  type="text"
                  placeholder="Ingrese país"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleBuscar}>Buscar</button>
              </div>
              <div className="paisCrear paisCaja" onClick={handleCrear}>
                <span>Crear</span>
              </div>
              <div className="paisEditar paisCaja" onClick={handleEditar}>
                <span>Editar</span>
              </div>
              <div className="paisBorrar paisCaja" onClick={handleBorrar}>
                <span>Eliminar</span>
              </div>
            </div>
            <div className="paisDerecha">
              <div className="paisLista">
                {filteredPaises.map((pais) => (
                  <PaisCard pais={pais} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
