import React from 'react';
import './App.css';
import RegisterPages from './pages/RegisterPages';
import LoginPages from './pages/LoginPages';
import Dashboard from './pages/Dashboard';
import SchedulePage from './pages/SchedulePage';
import { Routes, Route, Navigate } from 'react-router-dom'
function App() {
  const [userData,setUserData] = React.useState<any[]>([])
  const [tutor, setTutor] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<any>(true)
  let userLogin = false
  React.useEffect(() => {
    const fetchData = async() => {
      try {
        const reg = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await reg.json()
    //    console.log(data)
        if(data.success){
          setTutor(data.userinfo[0].tutor)
          setUserData(data.userinfo)
          setUser(true)
        }
        } catch(err) {
            console.error(err)
        }
    }
    fetchData()
  }, [])
  if(userData !== null){
    userLogin = true
  }
  return (
    <Routes>
      <Route 
          path="/register"
          element={ <RegisterPages />  } />
      <Route 
          path="/login"
          element={ <LoginPages />  } />
      <Route 
        path="/home"
        element={ userLogin ? <Dashboard /> : <Navigate to='/login'/>} />
        <Route 
        path="/schedule"
        element={ userLogin ? <SchedulePage /> : <Navigate to='/login'/>} />
    </Routes>
  );
}

export default App;
