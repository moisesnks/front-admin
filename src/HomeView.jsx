// Archivo HomeView.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomeView.css';

const HomeView = () => {
    return (
        <div>
            <h1>Bienvenido a la aplicación</h1>
            <div className='contenedor-apps'>
                <div className="aeropuerto-link">
                    <Link to="/aeropuertos">
                        <p> Aeropuertos </p>
                    </Link>
                </div>
                <div className="aeropuerto-link">
                    <Link to="/ciudades">
                        <p> Ciudades </p>
                    </Link>
                </div>
                <div className="aeropuerto-link">
                    <Link to="/paises">
                        <p> Paises </p>
                    </Link>
                </div>
                <div className="aeropuerto-link">
                    <Link to="/paquetes">
                        <p> Paquetes </p>
                    </Link>
                </div>
                <div className="aeropuerto-link">
                    <Link to="/upload_image">
                        <p> Subir Imagen </p>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default HomeView;
