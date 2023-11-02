import React from 'react';
import './PaisCard.css';

export default function PaisCard({ pais }) {
  // Asegúrate de que la URL de la imagen sea correcta
  const imagenURL = 'https://storage.googleapis.com/tisw-data-bucket/gallery/CrashBiocoot.webp';

  const handlePaisCardClick = () => {
    console.log(`Clic en la tarjeta de ${pais.nombre} (${pais.abreviacion}). ID: ${pais.id}`);
  };

  return (
    <div className="paisCard" key={pais.id} onClick={handlePaisCardClick}>
      <img src={imagenURL} alt={`Imagen de ${pais.nombre}`} />
      <div className="paisCardTitulo">
        <p>{pais.nombre}</p>
        <p>({pais.abreviacion})</p>
      </div>
    </div>
  );
}
