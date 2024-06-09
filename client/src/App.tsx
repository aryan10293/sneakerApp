import React from 'react';
import './App.css';
import RegisterPages from './pages/RegisterPages';
import LoginPages from './pages/LoginPages';
import Dashboard from './pages/Dashboard';
import SchedulePage from './pages/SchedulePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ScheduleSessionPage from './pages/ScheduleSessionPage';
import NotifcationPage from './pages/NotifcationPage';
import TutorDisplaySessionPage from './pages/TutorDisplaySessionPage';
import SignUpOrLogin from './compnents/SignUpOrLogin';
import { Routes, Route, Navigate } from 'react-router-dom'
function App() {
  const [userData,setUserData] = React.useState<any[]>([])
  const [tutor, setTutor] = React.useState<boolean>(false)
  const [id, setId] = React.useState<string>('')
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
          setId(data.userinfo[0]._id)
          setTutor(data.userinfo[0].tutor)
          setUserData(data.userinfo)
          setUser(true)
        }
        } catch(err) {
            // localStorage.clear()
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
          path="/"
          element={ <SignUpOrLogin />  } />
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
        <Route 
        path="/profile"
        element={ userLogin ? <ProfilePage /> : <Navigate to='/login'/>} />
        <Route 
        path="/profile/:id"
        element={ userLogin ? <ProfilePage /> : <Navigate to='/login'/>} />
        <Route 
        path="/settings"
        element={ userLogin ? <SettingsPage /> : <Navigate to='/login'/>} />
        <Route 
        path="/schedule-session/:id"
        element={ userLogin ? <ScheduleSessionPage /> : <Navigate to='/login'/>} />
        <Route 
        path="/notifications"
        element={ userLogin ? <NotifcationPage id={id}/> : <Navigate to='/login'/>} />
        <Route 
        path="/tutorsession/:id"
        element={ userLogin ? <TutorDisplaySessionPage /> : <Navigate to='/login'/>} />
    </Routes>
  );
}

export default App;
