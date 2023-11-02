import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalComponent = ({ title, show, handleClose, handleAccept, bodyContent, backdrop, closeButtonVariant, acceptButtonVariant, error }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={backdrop}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyContent}</Modal.Body>
            <Modal.Footer>
                {error ? (
                    <Button variant={closeButtonVariant} onClick={handleClose}>
                        Cerrar
                    </Button>
                ) : (
                    <>
                        <Button variant={closeButtonVariant} onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant={acceptButtonVariant} onClick={handleAccept}>
                            Aceptar
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

ModalComponent.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    bodyContent: PropTypes.node.isRequired,
    backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
    closeButtonVariant: PropTypes.string,
    acceptButtonVariant: PropTypes.string,
    error: PropTypes.bool,
};

ModalComponent.defaultProps = {
    backdrop: true,
    closeButtonVariant: 'secondary',
    acceptButtonVariant: 'primary',
    error: false,
};

export default ModalComponent;
