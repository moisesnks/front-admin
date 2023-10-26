// Archivo App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './HomeView';
import AeropuertosList from './AeropuertosList';
import CiudadesList from './CiudadesList';
import PaisesList from './PaisesList';
import PaquetesList from './PaquetesList';
import UploadImageView from './UploadImageView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/aeropuertos" element={<AeropuertosList />} />
        <Route path="/ciudades" element={<CiudadesList />} />
        <Route path="/paises" element={<PaisesList />} />
        <Route path="/paquetes" element={<PaquetesList />} />
        <Route path="/upload_image" element={<UploadImageView />} />

        {/* Otras rutas y componentes */}
      </Routes>
    </Router>
  );
};

export default App;
