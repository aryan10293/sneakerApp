import React from 'react'
import { Link } from 'react-router-dom'

function TutorLi(props:any) {
    const [sessions, setSessions] = React.useState<any[]>([])
    const [imgUrl, setImgUrl] = React.useState<string[]>([])
    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const reg = await fetch(`http://localhost:2020/getTutorSessions/${props.id}`,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
                })
                const data = await reg.json()
                setSessions(data)
                } catch(err) {
                    localStorage.clear()
                }
        }
        fetchData()
    }, [])
    React.useEffect(() => {
        const ids = sessions.map((x:any) => {
            return x.userId
        })
        const fetchData = async() => {
            try {
                const reg = await fetch(`http://localhost:2020/getimages`,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
                    body: JSON.stringify({stuff: sessions.map((x:any) => {return x.userId })}),
                })
                const data = await reg.json()
                setImgUrl(data)
                } catch(err) {
                    localStorage.clear()
                }
        }
        fetchData()
        // ill figure this shit out when i open my laptop again 
        // send user id to bvackend
        // get users images sent back to front end in an array 
        // display the usrrs images 
        // get back to working on the the view request page
        console.log(ids)
    }, [sessions])
    
function formatTimestamp(timestamp:string) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        const now = new Date();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const differenceInDays = Math.floor((now.getTime() - date.getTime()) / millisecondsPerDay);

        let dateString;
        const timeString = `${formattedHours}:${formattedMinutes} ${period}`;
        if (differenceInDays === 0) {
            dateString = `${timeString} Today`;
        } else if (differenceInDays === 1) {
            dateString = `Yesterday`;
        } else {
            dateString = `${differenceInDays} days ago`;
        }



        return dateString;
    }
  return (
            <div>
                {sessions.map((x:any, i:number) => {
                    return (
                        <div className="max-w-lg mx-auto items-center">
                        <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                            <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                                    <img className="w-full h-full object-cover rounded-full" src={imgUrl[i]} alt="" />
                                </div>
                            </div>
                            <div>
                                <span className="font-mono">{x.name} has requested a tutor session!</span>
                                <div className="font-mono">{formatTimestamp(x.date)}</div>
                            </div>
                            <div className="flex gap-2">
                                <button className='hover:bg-gray-700 hover:text-white'>
                                    <Link to={`/tutorsession/${x._id}`}>View Request</Link>
                                </button>
                                {/* <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
  )
}

export default TutorLi
