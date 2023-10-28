import React from 'react';
import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import SubirImagen from '../../components/SubirImagen'


export default function ImagenesView() {
    return (
        <div>
            <Header title="Imágenes" />
            <BigBox>
                <SubirImagen />
            </BigBox>
        </div>
    );
};


