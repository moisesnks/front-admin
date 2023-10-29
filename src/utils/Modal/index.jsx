import React from 'react';
import './Modal.css';

export default function Modal(props) {
    if (!props.isOpen) {
        return null;
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <button className="modal-close" onClick={props.onRequestClose}>
                    &times;
                </button>
                {props.children}
                <button className="modal-button" onClick={props.onRequestClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}