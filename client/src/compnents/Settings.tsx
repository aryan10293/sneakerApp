import React from 'react'
import { Fragment } from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
function Settings() {
    const usStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    const schoolYear = ['Freshman (High School)','Sophomore (High School)','Junior (High School)','Senior (High School)','Freshman (College)','Sophomore (College)','Junior (College)','Senior (College)'];
    const subjects = ['Algebra', 'Biology', 'English Composition', 'World History','Geometry', 'Chemistry', 'Literature', 'US History','Trigonometry', 'Physics', 'American Literature', 'Government','Calculus', 'Environmental Science', 'British Literature', 'Economics','Introduction to Psychology', 'College Algebra', 'Composition I', 'Introduction to Sociology','Statistics', 'Organic Chemistry', 'Composition II', 'Microeconomics','Advanced Calculus', 'Biochemistry', 'Creative Writing', 'Macroeconomics','Linear Algebra', 'Neuroscience', 'Technical Writing', 'International Relations']
    const [username, setUsername] = React.useState<string>('')
    const [date, setDate] = React.useState<any>('')
    const [about, setAbout] = React.useState<string>('')
    const [city,setCity] = React.useState<string>('')
    const [state,setState] = React.useState<string>('AL')
    const [yearInSchool, setYearInSchool] = React.useState<string>('Freshman (High School)')
    const [major, setMajor] = React.useState<string>('')
    const [school, setSchool] = React.useState<string>('')
    const [userData,setUserData] = React.useState<any[]>([])
    const [courses,setCourse] = React.useState<string[]>([])
    
    const userStuff = {
        username: username,
        dob: date,
        bio: about,
        city: city,
        state: state,
        subjects: courses,
        yearInSchool: yearInSchool,
        major: major,
        school: school,

    }
    React.useEffect(() => {
    const fetchData = async() => {
        try {
        const reg = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await reg.json()
        setUserData(data.userinfo)
        setUsername(data.userinfo[0].userName)
        setAbout(data.userinfo[0].bio)
        } catch(err) {
            console.error(err)
        }
    }
    fetchData()
    }, [])

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log( userStuff)

        try {
            const response = await fetch(`http://localhost:2020/editprofile`, {
                method: 'PUT',
                headers:  {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
                body: JSON.stringify(userStuff)
                })
            const data = await response.json()
        } catch (error) {
            console.log(error)
        }

    }
    const characterLimit = (e:any) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 200) {
            setAbout(inputValue);
        }
    }
    const handleSelectChange = (e:any) => {
        setState(e.target.value);
    };
    const HandleSubjects = (e:any) => {
      if(e.target.checked){
        setCourse([...courses, e.target.value])
      } else {
        setCourse(courses.filter(x => x !== e.target.value))
      }
    }
  return (

    <>
      <Header/>
      <div className='flex'>
        <NavMenu/>
        <form className='overflow-auto div p-10' onSubmit={handleSubmit}>
  <div className="space-y-12">
    <div className=" pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">This information Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus obcaecati, incidunt consectetur placeat non praesentium! Molestiae at, commodi nesciunt aperiam culpa rem ea! Maxime molestiae quasi explicabo quos facilis nulla ratione assumenda voluptatum itaque quas, quaerat esse architecto aliquid at. will be displayed publicly so be careful what you share.</p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={username} onChange={(e:any) => {setUsername(e.target.value)} }/>
            </div>
          </div>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Date Of Birth</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input type="date"  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={date} onChange={(e:any) => {setDate(e.target.value)} }/>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About Me</label>
          <div className="mt-2">
            <textarea id="about" name="about"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={about} onChange={characterLimit}></textarea>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">{about.length}/200</p>
        </div>

        <div className="col-span-full">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
            <div className="mt-2 flex items-center gap-x-3">
                <img className='relative z-10 block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none' src={userData.length > 0 ? userData[0].img : null} alt="" />
                <label htmlFor="file-upload" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">Change</label>
                <input id="file-upload" name="file-upload" type="file" className="hidden"  />{/* onChange={handleImageChange} */}
            </div>
        </div>


      </div>
    </div>

    <div className="pb-12">
       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                <div className="mt-2">
                    <input id="city" name="city" type="city" autoComplete="city" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e:any) => {setCity(e.target.value)}}  />
                </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">State</label>
                    <div className="mt-2">
                        <select id="state" value={state} onChange={handleSelectChange} name="state" autoComplete="state-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        {usStates.map((x:string) => (
                            <option value={x}>{x}</option>
                        )) }

                        </select>
                    </div>
                </div>
        </div>
    </div>

    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Educational Background</h2>
      <div className="sm:col-span-3">
        <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">Year In School</label>
            <div className="mt-2">
                <select id="year" value={yearInSchool} onChange={(e:any) => setYearInSchool(e.target.value)} name="year" autoComplete="year" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                {schoolYear.map((x:string) => (
                    <option value={x}>{x}</option>
                )) }

                </select>
            </div>

            <label htmlFor="year" className="block text-sm font-medium mt-2 leading-6 text-gray-900">School/College/University Name</label>
            <div className="mt-2">
                <input type="text" onChange={(e:any) => setSchool(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
            </div>

            <label htmlFor="year" className="block text-sm font-medium mt-2 leading-6 text-gray-900">Major or Field of Study</label>
            <div className="mt-2">
                <input type="text" onChange={(e:any) => setMajor(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
            </div>

        </div>

      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Subjects Interested In Or Needs Help With </legend>
          <div className="mt-6 grid grid-cols-7 gap-x-6 gap-y-6">
            {subjects.map((x:string) => {
                return(
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input id={x} name={x} type="checkbox" onChange={HandleSubjects} value={x} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor={x} className="font-medium text-gray-900">{x}</label>
                        </div>
                    </div>
                )
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">Everything</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">Same as email</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">No push notifications</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>

  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
  </div>
</form>

      </div>
    </>
  )
}

export default Settings

// function calculateAge(birthdate) {
//     // Convert birthdate string to Date object
//     const birthDate = new Date(birthdate);
    
//     // Get the current date
//     const currentDate = new Date();
    
//     // Calculate the difference in years
//     let age = currentDate.getFullYear() - birthDate.getFullYear();
    
//     // Check if the birthday has occurred this year
//     const currentMonth = currentDate.getMonth();
//     const birthMonth = birthDate.getMonth();
//     if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
//         age--;
//     }
    
//     return age;
// }

// // Example usage:
// const birthdate = "1990-05-15";
// const age = calculateAge(birthdate);