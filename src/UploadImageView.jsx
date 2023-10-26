import React from 'react';
import ImageUploader from './ImageUploader';

const UploadImageView = () => {
    return (
        <div>
            <h1>Subir Imágenes</h1>
            <p>Selecciona una imagen y haz clic en "Subir Imagen".</p>
            <ImageUploader />
        </div>
    );
};

export default UploadImageView;
