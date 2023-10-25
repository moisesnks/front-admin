// Archivo App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './HomeView';
import AeropuertosList from './AeropuertosList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/aeropuertos" element={<AeropuertosList />} />
        {/* Otras rutas y componentes */}
      </Routes>
    </Router>
  );
};

export default App;
