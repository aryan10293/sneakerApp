import React from 'react';
import './App.css';
import RegisterPages from './pages/RegisterPages';
import LoginPages from './pages/LoginPages';
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Routes>
      <Route 
          path="/"
          element={ <RegisterPages />  } />
      <Route 
          path="/login"
          element={ <LoginPages />  } />
    </Routes>
  );
}

export default App;
