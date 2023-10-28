import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../../utils/Spinner';
import './SubirImagen.css';

export default function SubirImagen() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Crear una URL de objeto para previsualizar la imagen
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
    };

    const handleUpload = async () => {
        try {
            setUploading(true);

            const formData = new FormData();
            formData.append('imagen', selectedFile);

            const response = await axios.post('http://localhost:8080/imagen/subir', formData);

            console.log('Respuesta del servidor:', response.data);

            if (response.status === 200) {
                setUploadMessage('Imagen subida con éxito');
            } else if (response.status === 409) {
                setUploadMessage('Error: El archivo ya existe');
            } else {
                setUploadMessage('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);

            if (error.response && error.response.data && error.response.data.error) {
                setUploadMessage(`Error: ${error.response.data.error}`);
            } else {
                setUploadMessage('Error al subir la imagen');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            {!uploading && (
                <>
                    <input type="file" onChange={handleFileChange} />
                    {previewUrl && <img src={previewUrl} alt="Previsualización" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                    <button onClick={handleUpload} disabled={uploading}>
                        Subir Imagen
                    </button>
                </>
            )}

            {/* Mensaje de carga o spinner */}
            {uploading && (
                <div>
                    <Spinner />
                    {/* También puedes agregar un mensaje si lo deseas */}
                    <p className="uploading-message">Subiendo imagen...</p>
                </div>
            )}

            {/* Mensaje de éxito o error */}
            {uploadMessage && !uploading && <p>{uploadMessage}</p>}
        </div>
    );
}
