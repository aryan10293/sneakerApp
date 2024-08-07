import React from 'react'
import NavMenu from './NavMenu'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
function ScheduleSession() {
    const {id} = useParams()
    const [userFirstname, setUserFirstname] = React.useState<any>([])
    const [tutor, setTutor] = React.useState<any[]>([])
    const [imCookin, setImCookin] = React.useState<any[]>([])
    const [text,setText] = React.useState<string>('')
    const [userId,setUserId] = React.useState<string>('')
    const [email,setEmail] = React.useState<string>('')
    const [name,setName] = React.useState<string>('')
    const [date, setDate] = React.useState<string>('')
    const [schedule, setSchedule] = React.useState<any[]>([])
    const [timeOpen, setTimeOpen] = React.useState<string[]>([])
    const [time, setTime] = React.useState<string>('')
    const [subject, setSubject] = React.useState<string>('')
    const [course, setCourse] = React.useState<string[]>([])
    const [tutorName,setTutorName] = React.useState<string>('')
    const today = new Date().toISOString().split('T')[0];
    const sessionData = {
        text:text,
        studentName:name,
        tutorName: tutorName,
        email:email,
        appointmentTimeDetails: {
            date:date,
            time:time,
            subject:subject
        },
        studentId:userId,
        tutorId: id,
        date: Date.now(),
    }
    const tutorNotiData = {
        date: Date.now(),
        message: `${userFirstname} wants to book a tutoring session with you!`,
        userId: id,
        typeOfNoti: 'tutor session',
        isRead: false,
        extras: [sessionData] 
    }
    const studentNotiData = {
        date: Date.now(),
        message: `You've booked a session with ${tutorName}`,
        userId: userId,
        typeOfNoti: 'tutor session',
        isRead: false,
        extras: [sessionData] 
    }
    React.useEffect(() => {
        const fetchData = async() => {
        try {
            const reg = await fetch(`http://localhost:2020/getuserid/${id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            })
            const data = await reg.json()
            console.log(data)
            setTutor(data.user)
            setCourse(data.user[0].courses)
            setTutorName(data.user[0].firstName)
            } catch(err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])
    React.useEffect(() => {
        if (tutor.length > 0) {
            const updatedImCookin = [];
            for (let key in tutor[0].availabity) {
                if (tutor[0].availabity[key]['start'] !== null) {
                    updatedImCookin.push([key, tutor[0].availabity[key]]);
                }
            }
            setImCookin(updatedImCookin);
        }
    }, [tutor]);
    React.useEffect(() => {
    const fetchData = async() => {
        try {
        const reg = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await reg.json()
        setUserFirstname(data.userinfo[0].firstName)
        setUserId(data.userinfo[0]._id)
        } catch(err) {
            console.error(err)
        }
    }
    fetchData()
    }, [])

    const handleSessionRequest = async (e:any) => {
        e.preventDefault()
        const req = await fetch(`http://localhost:2020/studentsessionrequest`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            body: JSON.stringify(sessionData)
        })
        const data = await req.json()
        if(data.status === '409')alert(data.message)
        if(data.status === '404')alert(data.message)
        if(data.status === '400')alert(data.message)
        const sendNoti = await fetch(`http://localhost:2020/notification`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            body: JSON.stringify({notiData: [tutorNotiData, studentNotiData]})
        })
        const notiSendData = await sendNoti.json()
        
        if(notiSendData.status === '200') window.location.href = '/home'

        
    }
    
    const handleDate = async (e:any) => {
        let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        const req = await fetch(`http://localhost:2020/getpendingsession/${id}/${e.target.value}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await req.json()
        const newDateValue = e.target.value;
        const [year, month, day] = newDateValue.split('-').map(Number);
        const lol = new Date(year, month - 1, day);
        setDate(`${year}-${month}-${day}`)
        for(let i in imCookin){
            if(imCookin[i].includes(days[lol.getDay()])){
                const time = []
                const start = Number(imCookin[i][1]['start'].split(':')[0])
                const end = Number(imCookin[i][1]['end'].split(':')[0])
                for(let i = start; i<end; i++){
                    const blah = `${i}:00 - ${i+1}:00`
                    if(!data.includes(blah)){
                        time.push(blah)
                    }
                }
                setSchedule(imCookin[i])
                setTimeOpen(time)
                setTime(time[0])
                break
            } else {
                setSchedule([])
            }
        }
    } 
  return (
    <>
      <div className="flex">
        <NavMenu/>
        <div className='w-screen flex justify-center items-center'>
            <div className='flex flex-col items-center justify-content max-w-xl m-20 '>
                <h1 className='text-3xl font-bold text-indigo-500'>Book A Session With {tutor.length > 0 ? tutor[0].userName.toUpperCase() : null}</h1>
                <form className='w-full' onSubmit={handleSessionRequest}>
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input type="text" onChange={(e:any) => setName(e.target.value)} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input type="email"  onChange={(e:any) => setEmail(e.target.value)}  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
                        <div className="mt-2">
                            <select onChange={(e:any) => setSubject(e.target.value)}  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                {course.map((x:any) => (
                                    <option  value={x} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" >{x}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label> Leave a message for {tutor.length > 0 ? tutor[0].userName.toUpperCase() : null} </label>
                        <textarea
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        cols={30}
                        rows={10}/>
                    </div>
                    <div className='flex flex-col'>
                        <input type="date" name="wec" id="wec" min={today} onChange={handleDate}/>
                        {schedule.length > 0 ? (
                            <>
                                <div>
                                    <h3>Here's {tutor.length > 0 ? tutor[0].userName.toUpperCase() : null} {schedule[0].charAt(0).toUpperCase() + schedule[0].slice(1)}day Availabity!</h3>
                                </div>
                                <select id="" name=""  onChange={(e:any) => setTime(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"  >
                                    {timeOpen.map((x:string) => (
                                        <option value={x}>{x}</option>
                                    )) }
                                </select>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3>The {tutor.length > 0 ? tutor[0].userName.toUpperCase() : null} Doesn't have an opening for the day you selected! </h3>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        <button type='submit' className='block flex-1 border-0  py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-indigo-500 mt-5 rounded-lg w-full sm:leading-6'>Request Session</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default ScheduleSession
