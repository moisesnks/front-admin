// ImageUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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

            // Cambia la URL a la ruta de tu servidor Express y controlador subirImagen
            const response = await axios.post('http://localhost:8080/imagen/subir', formData);

            console.log('Respuesta del servidor:', response.data);
            setModalMessage('Imagen subida con éxito');
            setModalShow(true);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setModalMessage('Error al subir la imagen');
            setModalShow(true);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {previewUrl && <img src={previewUrl} alt="Previsualización" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? <Spinner /> : 'Subir Imagen'}
            </button>

            {/* Modal */}
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Resultado de la carga</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ImageUploader;
