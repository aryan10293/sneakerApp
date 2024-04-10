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
  return (
    <>
      <Header/>
      <div className="flex">
        <NavMenu/>
        <div className='flex flex-col items-center w-screen m-20 '>
            <h1 className='text-3xl font-bold text-indigo-500'>Book A Session With {tutor.length > 0 ? tutor[0].userName.toUpperCase() : null}</h1>
            <form>
                <div className='flex flex-col'>
                    <label> Full Name </label>
                    <input type="text" />
                </div>
                <div className='flex flex-col'>
                    <label> Email Adress </label>
                    <input type="email" />
                </div>
                <div className='flex flex-col'>
                    <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    cols={30}
                    rows={10}/>
                </div>
                <div className='flex flex-col'>
                    <label> Select your Prefered Time {tutor.length > 0 ? tutor[0].zone.toUpperCase() : null}</label>
                    <select name="" id="">
                        {imCookin.map((x:any) => {
                            return(
                                <option value="idk yet">this is cool</option>
                            )
                        })}
                    </select>
                    {/* make on array for the day  */}
                    {/* when user clicks on a day person is open list out the times open */}
                    {/* user clicks a time to schedule */}
                </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default ScheduleSession
