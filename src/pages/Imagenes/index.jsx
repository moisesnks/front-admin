import React from 'react';
import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import Imagenes from '../../components/ImagenesListar'
import SubirImagen from '../../components/ImagenesSubir'


export default function ImagenesView() {
    return (
        <div>
            <Header title="Imágenes" />
            <BigBox>

                <SubirImagen />
                <Imagenes />
            </BigBox>
        </div>
    );
};


