import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Acomodacoes from './Acomodacoes';
import DetalhesAcomodacao from './DetalhesAcomodacao';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Acomodacoes />} />
        <Route path="/acomodacoes/:id" element={<DetalhesAcomodacao />} />
      </Routes>
    </Router>
  );
}

export default App;
