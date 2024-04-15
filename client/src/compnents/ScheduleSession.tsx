import React from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
function ScheduleSession() {
    const {id} = useParams()
    const [tutor, setTutor] = React.useState<any[]>([])
    const [idk, setIdk] = React.useState<any>({})
    const [imCookin, setImCookin] = React.useState<any[]>([])
    const [text,setText] = React.useState<string>('')
    const [email,setEmail] = React.useState<string>('')
    const [name,setName] = React.useState<string>('')
    const [date, setDate] = React.useState<string>('')
    const sessionData = {
        text:text,
        name:name,
        email:email
    }
    React.useEffect(() => {
        const fetchData = async() => {
        try {
            const reg = await fetch(`http://localhost:2020/getuserid/${id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            })
            const data = await reg.json()
            setTutor(data.user)
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

    const handleSessionRequest = (e:any) => {
        e.preventDefault()
        console.log(imCookin)
    }
    const handleDate = (e:any) => {
        let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    
        let lol = new Date(e.target.value)
        let idk = lol.getDay()
        setDate(days[idk])
        console.log( lol, days[idk], idk)
    } 
    console.log(imCookin)
  return (
    <>
      <Header/>
      <div className="flex">
        <NavMenu/>
        <div className='flex flex-col items-center w-screen m-20 '>
            <h1 className='text-3xl font-bold text-indigo-500'>Book A Session With {tutor.length > 0 ? tutor[0].userName.toUpperCase() : null}</h1>
            <form className='w-full' onSubmit={handleSessionRequest}>
                <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="text"  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="email"  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
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
                    <input type="date" name="wec" id="wec" onChange={handleDate}/>
                    {imCookin.includes(date) ? 'yay thus make worjk' : 'nah this shit aint wokrin'}
                    {/* <label> Select Day{tutor.length > 0 ? tutor[0].zone.toUpperCase() : null}</label>
                    <select name="" id="">
                        {imCookin.map((x:any) => {
                            return(
                                <option value="idk yet">{x[0].toUpperCase()}</option>
                            )
                        })}
                    </select> */}
                    {/* make on array for the day  */}
                    {/* when user clicks on a day person is open list out the times open */}
                    {/* user clicks a time to schedule */}
                </div>
                <div>
                    <button className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-indigo-400 w-full sm:leading-6'>Request Session</button>
                </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default ScheduleSession
