import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './AeropuertoCRUD.css';

export default function AeropuertoCRUD({ onDelete, selectedAeropuertos, onHandleCancel }) {



    const handleCancel = () => {

        if (onHandleCancel) {
            onHandleCancel();
        }
    }

    return (
        <div className='aeropuertoCrud'>
            {/* Boton para crear*/}
            <Button
                variant="primary"
                disabled={!(selectedAeropuertos.length === 0)}

            >
                Crear
            </Button>

            {/* Boton para editar*/}
            <Button
                variant="warning"
                disabled={selectedAeropuertos.length > 1 || selectedAeropuertos.length === 0}
            >
                Editar
            </Button>

            {/* Boton para eliminar*/}
            <Button
                onClick={onDelete}
                variant="danger"
                disabled={selectedAeropuertos.length === 0}
            >
                Eliminar
            </Button>

            {/* Boton para cancelar*/}
            <Button
                variant="danger"
                onClick={handleCancel}
                disabled={selectedAeropuertos.length === 0}
            >
                Cancelar
            </Button>
        </div>
    );
}
