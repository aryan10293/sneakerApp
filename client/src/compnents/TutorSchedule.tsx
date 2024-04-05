import React from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
function TutorSchedule() {
    const [course, setCourse] = React.useState<string>('')
    const [students, setStudents] = React.useState<any[]>([])

    const findStudents =  async(e:any) => {
        e.preventDefault()
        try {
            const reg = await fetch(`http://localhost:2020/findstudent/${course}`, {
                method:"GET",
                headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            })

            const data = await reg.json()
            setStudents(data)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
      <Header/>
      <div className='flex'>
        <NavMenu/>
        <div className='m-10'>
            <div>
                <form onSubmit={findStudents}>
                    <label htmlFor="idkyet">search for Students to teach</label>
                    <input type="text" value={course} onChange={(e)=> {setCourse(e.target.value)}}/>
                    <button className='bg-blue'>Find a Student</button>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, deleniti architecto ipsum asperiores saepe debitis repellendus maxime ab voluptatibus doloribus sunt sint blanditiis laboriosam magni. At reiciendis asperiores quia in sequi necessitatibus laudantium mollitia deleniti est neque ea, possimus adipisci nam quam aliquid fugiat excepturi officia illum ullam qui nostrum. Velit veritatis dignissimos sequi! Expedita, repellendus, consequuntur impedit ut obcaecati quasi repudiandae atque, quibusdam aperiam ab aut suscipit debitis perferendis sit. Saepe ut qui eos quisquam placeat! Similique molestiae suscipit nam eligendi tenetur! Dolor modi aperiam perspiciatis aliquam dolorum, deleniti, commodi labore unde accusantium voluptatibus natus, dignissimos facere possimus libero.</p>
                </form>
            </div>

            <div className='ml-10'>
            {students.map((x:any) => {
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
                                    <Link to='/home'> view profile</Link>
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

export default TutorSchedule
