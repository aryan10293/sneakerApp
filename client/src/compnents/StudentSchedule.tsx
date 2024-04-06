import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import NavMenu from './NavMenu'

function StudentSchedule() {
    const [course, setCourse] = React.useState<string>('')
    const [teachers, setTeachers] = React.useState<any[]>([])
    const findTeacher = async(e:any) => {
        e.preventDefault()
        try {
            const reg = await fetch(`http://localhost:2020/findtutor/${course}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            })
            const data = await reg.json()
            setTeachers(data)
            console.log(data)
            if(data){
                console.log('this is working')
            }
            } catch(err) {
                console.error(err) 
            }
        }

  return (
    <>
      <Header/>
      <div className='flex'>
        <NavMenu/>
        <div className='m-10'>
            <div>
                <form onSubmit={findTeacher}>
                    <label htmlFor="idkyet">search for course course teachers</label>
                    <input type="text" className='border-gray-300 ' value={course} onChange={(e)=> {setCourse(e.target.value)}}/>
                    <button className='bg-blue '>Find a teacher</button>
                </form>
            </div>

            <div className='ml-10'>
            {teachers.map((x:any) => {
                    return (
                        <>
                            <div className="flex space-x-4">
                                <div className="col-span-12 md:col-span-1 flex justify-center items-center">
                                    <img className="object-cover w-10 h-10 rounded-full" src={x.img} alt="image of teacher" />
                                </div>
                                
                                <div className="col-span-11 xl:-ml-5 flex justify-center items-center">
                                    <p className="text-blue-600 font-semibold "> {x.firstName} {x.lastName}</p>
                                </div>
                                
                                <div className="md:col-start-2 col-span-11 xl:-ml-5 flex justify-center items-center">
                                    <p className="text-sm text-gray-800 font-light"> {x.why}</p>
                                </div>
                                <div className='flex justify-center items-center space-x-4'>
                                    <Link to={`/profile/${x._id}`}> view profile</Link>
                                    <Link to='/werwtgrwh'> message tutor</Link>
                                </div>
                                
                            </div>
                        </>
                    )
                })}
            </div>

        </div>
      </div>
    </>
  )
}

export default StudentSchedule
