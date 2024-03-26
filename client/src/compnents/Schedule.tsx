import React, { Fragment } from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
function Schedule() {
    const [course, setCourse] = React.useState<string>('')
    const findTeacher = async(e:any) => {
        e.preventDefault()
        try {
            const reg = await fetch(`http://localhost:2020/findtutor/${course}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            })
            const data = await reg.json()
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
        </div>
      </section>
    </>
  )
}

export default Schedule
