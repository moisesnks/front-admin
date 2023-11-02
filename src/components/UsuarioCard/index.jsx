import React from 'react';
import './UsuarioCard.css';

export default function UsuarioCard({ usuario, onClick, isSelected }) {
  const imagenURL = `https://storage.googleapis.com/tisw-data-bucket/gallery/${usuario.fotodeperfil}`;

  return (
    <div className={`usuarioCard ${isSelected ? 'seleccionado' : ''}`} onClick={onClick}>
      <img src={imagenURL} alt={`Imagen de ${usuario.nombre} ${usuario.apellido}`} />
      <div className="usuarioCardInfo">
        <p className="nombre"> {usuario.nombre} {usuario.apellido}</p>
        <p> {usuario.email}</p>
      </div>
    </div>
  );
}
