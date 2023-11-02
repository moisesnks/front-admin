import React, { useEffect, useState } from 'react';
import './Usuarios.css'; // Asegúrate de importar los estilos de Usuarios
import Spinner from '../../utils/Spinner';
import { fetchUsuarios } from '../../api';
import UsuarioCard from '../UsuarioCard';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    const term = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normaliza el término de búsqueda

    if (term === '') {
      setFilteredUsuarios(usuarios);
    } else {
      const filteredUsuarios = usuarios.filter((usuario) => {
        const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normaliza el nombre completo
        const rut = usuario.rut.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normaliza el RUT
        const email = usuario.email.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normaliza el email

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
                <div className="usuarioCrear usuarioCaja " onClick={handleCrear}>
                  <span>Crear</span>
                </div>
                <div className="usuarioEditar usuarioCaja " onClick={handleEditar}>
                  <span>Editar</span>
                </div>
                <div className="usuarioBorrar usuarioCaja " onClick={handleBorrar}>
                  <span>Banear</span>
                </div>
              </div>
            </div>
            <div className="usuarioContenedor ">
              <div className="usuarioLista ">
                {filteredUsuarios.map((usuario) => (
                  <UsuarioCard usuario={usuario} key={usuario.id} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
