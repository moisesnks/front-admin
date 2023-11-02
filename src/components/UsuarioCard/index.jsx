import React from 'react';
import './UsuarioCard.css';

export default function UsuarioCard({ usuario }) {
  // Asegúrate de que la URL de la imagen sea correcta
  const imagenURL = `https://storage.googleapis.com/tisw-data-bucket/gallery/${usuario.fotodeperfil}`;

  const handleUsuarioCardClick = () => {
    console.log(`Clic en la tarjeta de ${usuario.nombre} ${usuario.apellido}`);
  };

  return (
    <div className="usuarioCard" onClick={handleUsuarioCardClick}>
      <img src={imagenURL} alt={`Imagen de ${usuario.nombre} ${usuario.apellido}`} />
      <div className="usuarioCardInfo">
        <p className="nombre"> {usuario.nombre} {usuario.apellido}</p>
        <p> {usuario.email}</p>
        {/* <p>RUT: {usuario.rut}</p>
        <p>Teléfono: {usuario.fono}</p>
        <p>Fecha de Nacimiento: {usuario.fecha_nacimiento}</p> */}
      </div>
    </div>
  );
}
