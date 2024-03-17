import React from 'react';
import './App.css';
import RegisterPages from './pages/RegisterPages';
import LoginPages from './pages/LoginPages';
import DashboardTutor from './compnents/DashboardTutor';
import DashboardStudent from './compnents/DashboardStudent';
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
      <Route 
          path="/dashboard"
          element={ <DashboardTutor />  } />
    </Routes>
  );
}

export default App;
