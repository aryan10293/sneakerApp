import React from 'react'
import DashboardStudent from '../compnents/DashboardStudent'
import DashboardTutor from '../compnents/DashboardTutor'
import { Fragment } from 'react'
function Dashboard() {
    const [userData, setUserData] = React.useState<any>(null)
    const fetchData = async() => {
        try {
            const reg = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            })
            const data = await reg.json()
        //    console.log(data)
            if(data.success){
            console.log(data)
            setUserData(data.userinfo[0].tutor)
            }
            } catch(err) {
                console.error(err)
            }
        }
      React.useEffect(() => {fetchData()}, [])

  console.log(userData)
    return (
        <>
            {userData ? <DashboardTutor/> : <DashboardStudent/>}
        </>
    );
}

export default Dashboard
