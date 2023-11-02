import React, { useEffect, useState } from 'react';
import './Usuarios.css';
import Spinner from '../../utils/Spinner';
import ModalComponent from '../../utils/ModalComponent';
import { fetchUsuarios } from '../../api';
import UsuarioCard from '../UsuarioCard';


export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectState, setSelectState] = useState(false);
  const [usuariosSelected, setUsuariosSelected] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsuarios();
        setUsuarios(data);
        setFilteredUsuarios(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingUsuarios(false);
      }
    };

    fetchData();
  }, []);

  function handleBuscar() {
    const term = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (term === '') {
      setFilteredUsuarios(usuarios);
    } else {
      const filteredUsuarios = usuarios.filter((usuario) => {
        const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const rut = usuario.rut.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const email = usuario.email.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return (
          nombreCompleto.includes(term) ||
          rut.includes(term) ||
          email.includes(term)
        );
      });
      setFilteredUsuarios(filteredUsuarios);
    }
  }

  function handleCrear() {
    console.log('Boton Crear Presionado');
  }

  function handleEditar() {
    console.log('Boton Editar Presionado');
  }

  function handleBorrar() {
    console.log('Boton Borrar Presionado');
  }

  const handleSeleccionar = () => {
    setSelectState(!selectState);

    // Si selectState cambia a false, limpiar la lista de usuarios seleccionados
    if (selectState === true) {
      setUsuariosSelected([]);
    }
  };

  const handleAcceptBorrar = () => {
    console.log('Borrando usuarios:', usuariosSelected);
    console.log("IDs:", usuariosSelected.map((usuario) => usuario.id));
    setShowModal(false);
    setUsuariosSelected([]);

  };

  const handleUsuarioCardClick = (usuario) => {
    console.log("Usuario clickeado:", usuario);
    console.log("Estado de seleccion:", selectState);
    console.log("Usuarios seleccionados:", usuariosSelected);

    setUsuariosSelected((prevSelected) => {
      const isSelected = prevSelected.some((selected) => selected.id === usuario.id);

      if (isSelected) {
        // Si el usuario ya está seleccionado, deseleccionarlo y quitar la clase
        return prevSelected.filter((selected) => selected.id !== usuario.id);
      } else {
        // Si el usuario no está seleccionado, seleccionarlo y agregar la clase
        if (selectState) {
          // Si selectState es true, manejar la lógica de selección
          return [...prevSelected, usuario];
        } else {
          // Si selectState es false, deseleccionar cualquier otro usuario seleccionado y seleccionar el actual
          return [usuario];
        }
      }
    });
  };

  // // Crea un nuevo arreglo de usuarios con N duplicados funcion
  /*
  const createDuplicatedUsers = (n) => {
    const duplicatedUsers = [];
    for (let i = 0; i < n; i++) {
      duplicatedUsers.push(...usuarios);
    }
    return duplicatedUsers;
  };

  const prueba = createDuplicatedUsers(5);
  */

  const showBanModal = () => {
    const banModalBody = usuariosSelected.length < 1 ? (
      <p>Debes seleccionar al menos un usuario.</p>
    ) : (
      <div>
        <p>¿Estás seguro de que quieres eliminar a los siguientes usuarios?</p>
        <ul>
          {usuariosSelected.map((selected) => (
            <li key={selected.id}> {selected.email} </li>
          ))}
        </ul>
      </div>
    );

    setModalBody(banModalBody);
    setShowModal(true);
  };





  return (
    <div>
      {loadingUsuarios ? (
        <Spinner />
      ) : (
        <>
          <div className="usuarioTitulo">
            <h1>Administrador de Usuarios</h1>
          </div>
          <div className="usuarioContenido">
            <div className="usuarioContenedor">
              <div className="usuarioBuscar usuarioCaja">
                <input
                  type="text"
                  placeholder="Ingrese usuario"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleBuscar}>Buscar</button>
              </div>
              <div className="usuarioBotones">
                <div className="usuarioCrear usuarioCaja" onClick={handleCrear}>
                  <span>Crear</span>
                </div>
                <div className="usuarioEditar usuarioCaja" onClick={handleEditar}>
                  <span>Editar</span>
                </div>
                <div className="usuarioBorrar usuarioCaja" onClick={showBanModal}>
                  <span>Banear</span>
                </div>
                <div
                  className={`usuarioSeleccionar usuarioCaja ${selectState ? 'seleccionado' : ''}`}
                  onClick={handleSeleccionar}
                >
                  {selectState ? 'Deseleccionar' : 'Seleccionar varios'}
                </div>

              </div>
            </div>
            <div className="usuarioContenedor">
              <div className="usuarioLista">
                {filteredUsuarios.map((usuario) => (
                  <UsuarioCard
                    key={usuario.id}
                    usuario={usuario}
                    onClick={() => handleUsuarioCardClick(usuario)}
                    isSelected={usuariosSelected.some((selected) => selected.id === usuario.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <ModalComponent
        title={usuariosSelected.length > 0 ? "ELIMINAR" : "ERROR"}
        show={showModal}
        handleClose={() => setShowModal(false)}
        bodyContent={modalBody}
        closeButtonVariant="danger"
        acceptButtonVariant="success"
        handleAccept={usuariosSelected.length > 0 ? handleAcceptBorrar : undefined}
        error={(usuariosSelected.length < 1)}
      />
    </div>
  );
}