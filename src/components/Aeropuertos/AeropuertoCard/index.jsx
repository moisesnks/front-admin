import './AeropuertoCard.css';
import React, { useState } from 'react';

export default function AeropuertoCard({ aeropuerto, onCardClick, selectedAeropuertos }) {
    const imagenURL = 'https://storage.googleapis.com/tisw-data-bucket/gallery/CrashBiocoot.webp';
    const isSelected = selectedAeropuertos && selectedAeropuertos.includes(aeropuerto.id);

    const handleAirportCardClick = () => {
        if (onCardClick) {
            onCardClick(aeropuerto.id);
        }
    };

    return (
        <div
            className={`aeropuertoCard ${isSelected ? 'selected' : ''}`}
            key={aeropuerto.id}
            onClick={handleAirportCardClick}
        >
            <img src={imagenURL} alt={`Imagen de ${aeropuerto.nombre}`} />
            <div className="aeropuertoCardInfo">
                <div className="aeropuertoCardTitulo">
                    <p>{aeropuerto.nombre}</p>
                </div>
                <hr />
                <div className="aeropuertoCardDesc">
                    <p>
                        <b>{aeropuerto.nombre_ciudad}</b>, {aeropuerto.nombre_pais}
                    </p>
                </div>
            </div>
        </div>
    );
}
