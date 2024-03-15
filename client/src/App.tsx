import React from 'react';
import './App.css';
import RegisterPages from './pages/RegisterPages';
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Routes>
      <Route 
          path="/"
          element={ <RegisterPages />  } />
    </Routes>
  );
}

export default App;
