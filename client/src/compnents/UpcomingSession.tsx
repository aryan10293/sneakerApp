import React from 'react'
import { Link } from 'react-router-dom'
function UpcomingSession(props:any) {
    const [upcomingSessions, setUpcomingSessions] = React.useState<any[]>([])
    const [userData, setUserData] = React.useState(props.userData)
    const [upcomingSessionsUsers, setUpcomingSessionsUsers] = React.useState<any>()
    React.useEffect(() => {
        const getUpcomignSessions = async () =>  {
            const getSessions = await fetch(`http://localhost:2020/getcomfirmedsessions/${userData._id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })

            const turnToSessionsToJson = await getSessions.json()
            if(turnToSessionsToJson.status === '404'){
                return <div>you have no upcoming sessions</div>
                console.log('no upcoming sessions')
            } else if(turnToSessionsToJson.status === '200'){
                const upcomingTutorSession = turnToSessionsToJson.details.filter((x:any) => x.typeOfNoti === 'confirmed session')
                setUpcomingSessions(upcomingTutorSession)
            }

        }

        getUpcomignSessions()
    }, [])
    React.useEffect(() => {
       const getUsersId = async () => {
            if(props.userData.tutor){
                const usersIds = upcomingSessions.map((x:any) => x.extras[0].studentId)
                setUpcomingSessionsUsers(usersIds)
            } else {
                const usersIds = upcomingSessions.map((x:any) => x.extras[0].tutorId)
                setUpcomingSessionsUsers(usersIds)
            }

            const getUserData = await fetch(`http://localhost:2020/getmultipleusers`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(upcomingSessionsUsers)
            })
            const recievedUserData = await getUserData.json()
            console.log(recievedUserData)

       }
       getUsersId()
    }, [upcomingSessions])

  return (
            <>  
                {upcomingSessions.map((x:any) => {
                    
                    return (
                        <div className="max-w-lg mx-auto items-center">
                            <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                                <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                                        <img className="w-full h-full object-cover rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="" />
                                    </div>
                                </div>
                                <div>
                                    <span className="font-mono">(user10239) has messaged you!</span>
                                    <div className="font-mono">the time will go here  </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className='hover:bg-gray-700 hover:text-white'>
                                        <Link to={'/messages/useridnumber'}>View Messages</Link>
                                    </button>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div> 
                    )
                })}
            
            </>
  )
}

export default UpcomingSession