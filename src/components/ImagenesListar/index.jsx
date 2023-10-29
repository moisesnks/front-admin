// src/components/Imagenes/index.jsx
import React, { useEffect, useState } from 'react';
import Spinner from '../../utils/Spinner';
import { fetchListarImagenes } from '../../api';
import SubirImagen from '../ImagenesSubir';

import './Imagenes.css';


export default function Imagenes() {
    const [imagenes, setImagenes] = useState([]);
    const [loadingImagenes, setLoadingImagenes] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchListarImagenes();
                setImagenes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingImagenes(false);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            {loadingImagenes ? (
                <Spinner />
            ) : (
                <>
                    <div className="container-title">
                        <h1>Lista de Imágenes</h1>
                    </div>
                    <div className="container-gallery">
                        {imagenes.map((imagen) => (
                            <div key={imagen.id} className="imagen-box">
                                <img src={imagen.url_publica} alt={imagen.id} />
                                <p>{imagen.id}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
