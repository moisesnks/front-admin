import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';

import AeropuertoLista from '../../components/Aeropuertos/AeropuertoLista';
import AeropuertoCRUD from '../../components/Aeropuertos/AeropuertoCRUD';

import Header from '../../utils/Header';
import BigBox from '../../utils/BigBox';
import Spinner from '../../utils/Spinner';
import ModalComponent from '../../utils/ModalComponent';

import './Aeropuertos.css';

import { fetchAeropuertos, fetchPaises, fetchCiudades } from '../../api';

export default function AeropuertosPage() {
    const [aeropuertos, setAeropuertos] = useState([]); // Datos de aeropuertos
    const [paises, setPaises] = useState([]); // Datos de países
    const [ciudades, setCiudades] = useState([]); // Datos de ciudades
    const [selectedAeropuertos, setSelectedAeropuertos] = useState([]); // Aeropuertos seleccionados
    const aeropuertosIniciales = useRef([]); // Referencia para almacenar los aeropuertos iniciales
    const [loadingAeropuertos, setLoadingAeropuertos] = useState(true); // Indicador de carga de aeropuertos
    const [loadingPaises, setLoadingPaises] = useState(true); // Indicador de carga de países
    const [loadingCiudades, setLoadingCiudades] = useState(true); // Indicador de carga de ciudades
    const [filtroPais, setFiltroPais] = useState(null); // Filtro de país
    const [filtroCiudad, setFiltroCiudad] = useState(null); // Filtro de ciudad
    const [botonPresionado, setBotonPresionado] = useState(null); // Botón presionado
    const [allAeropuertosSelected, setAllAeropuertosSelected] = useState(false); // Indicador de si todos los aeropuertos están seleccionados
    const [selectedAirportInfo, setSelectedAirportInfo] = useState([]);  //  estado para la información de aeropuertos seleccionados
    const [showModal, setShowModal] = useState(false); // Mostrar u ocultar modal
    const [modalBody, setModalBody] = useState(null); // Contenido del modal


    // useEffect para cargar los datos iniciales en AeropuertoLista
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

                // Eliminar seleccionados que ya no cumplen con los filtros
                setSelectedAeropuertos((prevSelected) => {
                    const updatedSelected = prevSelected.filter((aeropuertoId) => {
                        const aeropuerto = aeropuertosFiltrados.find((a) => a.id === aeropuertoId);
                        return aeropuerto !== undefined;
                    });
                    return updatedSelected;
                });

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

    // Fin de los UseEffect para cargar los datos iniciales en AeropuertoLista

    // Efecto para actualizar selectedAirportInfo cuando cambian los aeropuertos seleccionados
    useEffect(() => {
        const updatedSelectedAirportInfo = selectedAeropuertos.map((aeropuertoId) => {
            const aeropuertoDetails = aeropuertos.find((aeropuerto) => aeropuerto.id === aeropuertoId);
            return {
                id: aeropuertoDetails.id,
                nombre: aeropuertoDetails.nombre,
                nombre_ciudad: aeropuertoDetails.nombre_ciudad,
                nombre_pais: aeropuertoDetails.nombre_pais,
            };
        });
        setSelectedAirportInfo(updatedSelectedAirportInfo);
    }, [selectedAeropuertos, aeropuertos]);
    // Fin del useEffect para actualizar selectedAirportInfo

    // Handlers para AeropuertoCard
    const handleCardClick = (aeropuertoId) => {
        setSelectedAeropuertos((prevSelected) => {
            if (prevSelected.includes(aeropuertoId)) {
                // Si ya está seleccionado, lo deseleccionamos
                return prevSelected.filter((id) => id !== aeropuertoId);
            } else {
                // Si no está seleccionado, lo seleccionamos
                return [...prevSelected, aeropuertoId];
            }
        });
    };

    // Fin de los handlers para AeropuertoCard dentro de AeropuertoLista

    // Handlers para AeropuertoCRUD
    const handleCancel = () => {
        setSelectedAeropuertos([]);
    };
    // Fin de los handlers para AeropuertoCRUD


    // Handlers para AeropuertoLista
    const handleFiltroPais = (paisId) => {
        setFiltroPais(paisId);
        setBotonPresionado(paisId);
        setFiltroCiudad(null);

    };

    const handleFiltroCiudad = (ciudadId) => {
        console.log("se seteo la ciudad a: " + ciudadId);
        setFiltroCiudad(ciudadId);
    };
    // Fin de los handlers para AeropuertoLista

    // Nuevo handler para seleccionar o deseleccionar todos los aeropuertos
    const handleSelectAllAeropuertos = () => {
        if (allAeropuertosSelected) {
            // Si todos los aeropuertos están seleccionados, deseleccionar todos
            setSelectedAeropuertos([]);
        } else {
            // Si no todos los aeropuertos están seleccionados, seleccionar todos
            const allAeropuertosIds = aeropuertos.map((aeropuerto) => aeropuerto.id);
            setSelectedAeropuertos(allAeropuertosIds);
        }
        // Alternar el estado de todos los aeropuertos seleccionados
        setAllAeropuertosSelected((prev) => !prev);
    };

    // función para showBanModal para eliminar
    const handleDelete = () => {
        console.log("Aeropuertos seleccionados:", selectedAeropuertos);

        const deleteModalBody = selectedAirportInfo.length < 1 ? (
            <p>Debes seleccionar al menos un aeropuerto.</p>
        ) : (
            <div>
                <p>¿Estás seguro de que quieres eliminar los siguientes aeropuertos?</p>

                <div className="modalContent">
                    <ul>
                        {selectedAirportInfo.map((info) => (
                            <li key={info.id}> [ {info.id} ] {info.nombre} </li>
                        ))}
                    </ul>
                </div>
            </div>
        );

        setModalBody(deleteModalBody);
        setShowModal(true);
    };


    return (
        <div>
            <Header title="Aeropuertos" />
            <BigBox>
                <div className="aeropuertoTitulo">
                    <h1>Administrador de Aeropuertos</h1>
                </div>
                {loadingAeropuertos && loadingCiudades && loadingPaises ? (
                    <Spinner />
                ) : (
                    <div className="aeropuerto-content">
                        <div className="aeropuerto-izq">
                            <div className="aeropuertosSeleccionados">
                                <div className="aeropuertosTituloSelected">
                                    <h3>Aeropuertos Seleccionados</h3>
                                    {/* Botón para seleccionar todos los aeropuertos */}
                                    <div className="selectedContent">
                                        <Button
                                            className='btn-select-all'
                                            onClick={handleSelectAllAeropuertos}
                                            variant={allAeropuertosSelected ? 'danger' : 'primary'}
                                        >
                                            {allAeropuertosSelected ? "Deseleccionar Todos" : "Seleccionar Todos"}
                                        </Button>
                                        {/* Contador de aeropuertos seleccionados */}
                                        <p className="aeropuertosSeleccionadosCount">{`${selectedAeropuertos.length} `}</p>

                                    </div>
                                </div>
                                <div className="aeropuertoSelectLista">
                                    {selectedAeropuertos && selectedAeropuertos.length > 0 ? (
                                        <div className="aeropuertoDetails">
                                            {selectedAirportInfo.map((info, index) => (
                                                <p key={index} className="aeropuertoDetalle">
                                                    {`[ ${info.id} ] ${info.nombre}, ${info.nombre_ciudad}, ${info.nombre_pais}`}
                                                </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No hay aeropuertos seleccionados.</p>
                                    )}
                                </div>
                            </div>

                            <div className="aeropuerto-crud">
                                <AeropuertoCRUD
                                    onDelete={handleDelete}
                                    selectedAeropuertos={selectedAeropuertos}
                                    onHandleCancel={handleCancel}
                                />
                            </div>
                        </div>
                        <div className="aeropuerto-lista">
                            <AeropuertoLista
                                aeropuertos={aeropuertos}
                                selectedAeropuertos={selectedAeropuertos}
                                onCardClick={handleCardClick}
                                paises={paises}
                                ciudades={ciudades}
                                filtroPais={filtroPais}
                                filtroCiudad={filtroCiudad}
                                botonPresionado={botonPresionado}
                                handleFiltroPais={handleFiltroPais}
                                handleFiltroCiudad={handleFiltroCiudad}
                            />
                        </div>
                    </div>
                )}
            </BigBox>
            <ModalComponent
                title={selectedAeropuertos.length > 1 ? "ELIMINAR VARIOS" : "ELIMINAR"}
                show={showModal}
                handleClose={() => setShowModal(false)}
                bodyContent={modalBody || ''}
                closeButtonVariant="danger"
                acceptButtonVariant="success"
                handleAccept={selectedAeropuertos.length > 0 ? handleDelete : () => { }}
                error={selectedAeropuertos.length < 1}
            />

        </div>
    );
}
