// src/components/ImagenesSubir/index.jsx
import React, { useState } from 'react';
import Spinner from '../../utils/Spinner';
import { subirImagen } from '../../api/imagenes';
import Modal from '../../utils/Modal';

import './ImagenesSubir.css';

export default function SubirImagen(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [nombreOpcional, setNombreOpcional] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [alt, setAlt] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [shouldCloseModal, setShouldCloseModal] = useState(true); // Agregamos el estado

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
    };

    const handleUpload = async () => {

    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        if (shouldCloseModal) {
            setShowModal(false);
            setUploadMessage('');
        }
        // Restaurar el valor predeterminado al cerrar el modal
        setShouldCloseModal(true);
    };


    return (
        <div className="subir-imagen-container">
            <button className="subir-imagen-button" onClick={handleOpenModal}>SUBIR IMAGEN</button>

            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                contentLabel="Subir Imagen"
            >
                <form >
                    <label className="modal-label upload">
                        <input className="modal-input" type="file" onChange={handleFileChange} />
                        {previewUrl && (
                            <div className="modal-image">
                                <img src={previewUrl} alt="Previsualización" className="modal-preview" />
                            </div>
                        )}
                    </label>

                    <label className="modal-label">
                        <span className="modal-text">Cambiar Nombre</span>
                        <input
                            className="modal-checkbox"
                            type="checkbox"
                            checked={nombreOpcional}
                            onChange={() => setNombreOpcional(!nombreOpcional)}
                        />
                        {nombreOpcional ? (
                            <input
                                className="modal-input"
                                type="text"
                                value={nuevoNombre}
                                onChange={(e) => setNuevoNombre(e.target.value)}
                                onClick={() => setNombreOpcional(true)}
                                placeholder={selectedFile ? selectedFile.name : 'Nuevo Nombre'}
                            />
                        ) : (
                            <input
                                className="modal-input"
                                type="text"
                                value={selectedFile ? selectedFile.name : ''}
                                disabled
                            />
                        )}
                    </label>
                    <label className="modal-label">
                        <span className="modal-text">(*) Alt:</span>
                        <input className="modal-input" type="text" value={alt} onChange={(e) => setAlt(e.target.value)} />
                    </label>
                    <label className="modal-label">
                        <span className="modal-text">Descripción</span>
                        <input className="modal-input" type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </label>
                    <button className="modal-button" type="submit" disabled={uploading}>
                        Subir Imagen
                    </button>
                    {(
                        <button className="modal-button" type="button" onClick={handleCloseModal}>
                            Cerrar
                        </button>
                    )}
                </form>
            </Modal>


        </div>
    );
}