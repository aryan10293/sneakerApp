import React from 'react'
import StudentSchedule from '../compnents/StudentSchedule'

function SchedulePage() {
  const [userData, setUserData] = React.useState<boolean>(true)
  const fetchData = async() => {
    try {
        const reg = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await reg.json()
        setUserData(data.userinfo[0].tutor)
        } catch(err) {
            console.error(err)
        }
    }
      React.useEffect(() => {fetchData()}, [])
  return (
    <>
      {userData ? null: <StudentSchedule/> }
    </>
  )
}

export default SchedulePage

function fetchData() {
  throw new Error('Function not implemented.')
}

