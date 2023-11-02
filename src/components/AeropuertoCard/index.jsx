import React from 'react';
import './AeropuertoCard.css';

export default function AeropuertoCard({ aeropuerto }) {
    const imagenURL = 'https://storage.googleapis.com/tisw-data-bucket/gallery/CrashBiocoot.webp';

    const handleAirportCardClick = () => {
        console.log(`Clic en la tarjeta de ${aeropuerto.nombre}. ID: ${aeropuerto.id}`);
    }

    return (
        <div className="aeropuertoCard" key={aeropuerto.id} onClick={handleAirportCardClick}>
            <img src={imagenURL} alt={`Imagen de ${aeropuerto.nombre}`} />
            <div className="aeropuertoCardTitulo">
                <p><b>{aeropuerto.nombre}</b></p>
                <p><b>Ciudad:</b> {aeropuerto.nombre_ciudad}</p>
                <p><b>País:</b> {aeropuerto.nombre_pais} ({aeropuerto.abrev_pais})</p>
            </div>
        </div>
    );
}
