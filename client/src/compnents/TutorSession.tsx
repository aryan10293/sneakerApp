import React from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
import { Params, Link, useParams } from 'react-router-dom'
function TutorSession() {
    const {id} = useParams()
    const [user, setUser] = React.useState<string>('')
    const [session, sessionDetails] = React.useState<Notification>({
    appointmentTimeDetails: {
        date: "",
        time: "",
        subject: ""
    },
    date: "",
    email: "",
    name: "",
    seen: false,
    text: "",
    tutorId: "",
    typeOfNoti: "",
    userId: "",
    __v: 0,
    _id: ""
})
    const [userInfo, setUserInfo] = React.useState<User>({bio: "",
    city: "",
    courses: [],
    dob: "",
    email: "",
    firstName: "",
    img: "",
    lastName: "",
    major: "",
    messages: [],
    password: "",
    pendingSession: [],
    school: "",
    state: "",
    subjects: [],
    tutor: false,
    userName: "",
    why: "",
    yearInSchool: "",
    zone: "",
    __v: 0,
    _id: ""})

    interface User {
        bio: string,
        city: string,
        courses: string[],
        dob: string,
        email: string,
        firstName: string,
        img: string,
        lastName: string,
        major: string,
        messages: any[], // You can define a specific type for messages if known
        password: string,
        pendingSession: any[], // You can define a specific type for pending sessions if known
        school: string,
        state: string,
        subjects: string[],
        tutor: boolean,
        userName: string,
        why: string,
        yearInSchool: string,
        zone: string,
        __v: number,
        _id: string

    }
    interface Notification {
    appointmentTimeDetails: {
        date: string,
        time: string,
        subject: string
    },
    date: string,
    email: string,
    name: string,
    seen: boolean,
    text: string,
    tutorId: string,
    typeOfNoti: string,
    userId: string,
    __v: number,
    _id: string
}
    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const reg = await fetch(`http://localhost:2020/getTutorSession/${id}`,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
                })
                const data = await reg.json()
                sessionDetails(data[0])
                setUser(data[0].userId)
                } catch(err) {
                    console.error(err)
                }
        }
        fetchData()
    }, [])
    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const reg = await fetch(`http://localhost:2020/getuserid/${user}`,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
                })
                const data = await reg.json()
                setUserInfo(data.user[0])
                } catch(err) {
                    console.error(err)
                }
        }
        fetchData()
    }, [user])
    console.log(session)
  return (
    <>
        <Header/>
        <div className='flex'>
            <NavMenu/>
                <div className="bg-gray-100 w-full">
                    <div className="container mx-auto py-8">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                            <div className="col-span-4 sm:col-span-3 ">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <div className="flex flex-col items-center">
                                        <img src={userInfo.img} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                                        </img>
                                        <h1 className="text-xl font-bold">{userInfo.firstName} {userInfo.lastName}</h1>
                                        <p className="text-gray-700">{userInfo.major}</p>
                                        <p className="text-gray-700">{userInfo.school}</p>
                                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                            <a href="#" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Accept</a>
                                            <a href="#" className="bg-red-300 hover:bg-red-400 text-white-700 py-2 px-4 rounded">Decline</a>
                                        </div>
                                    </div>
                                    <hr className="my-6 border-t border-gray-300"/>
                                    <div className="flex flex-col">
                                        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Subjects</span>
                                        <ul>
                                            
                                           {userInfo.subjects.map((x,i) => {
                                            return (
                                                <li className="mb-2">{x}</li>
                                            )
                                           })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 sm:col-span-9 ">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-xl font-bold mb-4">About {userInfo.firstName}</h2>
                                    <p className="text-gray-700">{userInfo.bio}</p>

                                    <h2 className="text-xl font-bold mt-6 mb-4">Session Details</h2>
                                    <div className="mb-6">
                                        <div className="flex justify-between flex-wrap gap-2 w-full">
                                            <span className="text-gray-700 font-bold">{}</span>
                                            <p>
                                                <span className="text-gray-700 mr-2">{'date'}</span>
                                                <span className="text-gray-700 font-bold">{'time'}</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">
                                            {'notes'}
                                        </p>
                                    </div>

                                    <h2 className="text-xl font-bold mt-6 mb-4">Reviews</h2>
                                    <div className="mb-6">
                                        <div className="flex justify-between flex-wrap gap-2 w-full">
                                            <span className="text-gray-700 font-bold">{'teacher'}</span>
                                            <p>
                                                <span className="text-gray-700 mr-2">{'course'}</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">
                                            {'review stuff and stuff'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}

export default TutorSession
