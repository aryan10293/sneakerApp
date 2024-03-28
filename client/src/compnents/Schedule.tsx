import React, { Fragment } from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
function Schedule() {
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
      <section className='flex'>
        <NavMenu/>
        <div>
            <div>
                <form onSubmit={findTeacher}>
                    <label htmlFor="idkyet">search for course course teachers</label>
                    <input type="text" value={course} onChange={(e)=> {setCourse(e.target.value)}}/>
                    <button className='bg-blue'>Find a teacher</button>
                </form>
            </div>

            <div className='ml-10'>
            {teachers.map((x:any) => {
                    return (
                        <>
                            <div className="col-span-12 md:col-span-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#2563eb">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                            </div>
                            
                            <div className="col-span-11 xl:-ml-5">
                            <p className="text-blue-600 font-semibold"> Deploy a Flask App on App Platform </p>
                            </div>
                            
                            <div className="md:col-start-2 col-span-11 xl:-ml-5">
                            <p className="text-sm text-gray-800 font-light"> Build a Python app using Flask and then deploy the app to App Platform using a Gunicorn HTTP server. </p>
                            </div>
                        </>
                    )
                })}
            </div>

        </div>
      </section>
    </>
  )
}

export default Schedule
