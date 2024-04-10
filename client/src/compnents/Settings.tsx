import React from 'react'
import { Fragment } from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
function Settings() {
    const [username, setUsername] = React.useState<string>('')
    const [date, setDate] = React.useState<any>('')
    const [lol, setlol] = React.useState<any>('')
    const [about, setAbout] = React.useState<string>('')
    const [city,setCity] = React.useState<string>('')
    const [state,setState] = React.useState<string>('AL')
    const [yearInSchool, setYearInSchool] = React.useState<string>('Freshman (High School)')
    const [major, setMajor] = React.useState<string>('')
    const [school, setSchool] = React.useState<string>('')
    const [userData,setUserData] = React.useState<any[]>([])
    const [courses,setCourse] = React.useState<string[]>([])
    const [id,setId] = React.useState<string>('')
    const [why,setWhy] = React.useState<string>('')
    const [tutor, isTutor] = React.useState<boolean>(false)
    const [sun, isSun] = React.useState<boolean>(false)
    const [mon, isMon] = React.useState<boolean>(false)
    const [tue, isTue] = React.useState<boolean>(false)
    const [wed, isWed] = React.useState<boolean>(false)
    const [thu, isThu] = React.useState<boolean>(false)
    const [fri, isFri] = React.useState<boolean>(false)
    const [sat, isSat] = React.useState<boolean>(false)
    const [zone, setZone] = React.useState<string>("(GMT-08:00) Pacific Time (US & Canada)")
    const [sunStart, setSunStart] = React.useState<string>('0:00 AM')
    const [sunEnd, setSunEnd] = React.useState<string>('0:00 AM')
    const [monStart, setMonStart] = React.useState<string>('0:00 AM')
    const [monEnd, setMonEnd] = React.useState<string>('0:00 AM')
    const [tueStart, setTueStart] = React.useState<string>('0:00 AM')
    const [tueEnd, setTueEnd] = React.useState<string>('0:00 AM')
    const [wedStart, setWedStart] = React.useState<string>('0:00 AM')
    const [wedEnd, setWedEnd] = React.useState<string>('0:00 AM')
    const [thuStart, setThuStart] = React.useState<string>('0:00 AM')
    const [thuEnd, setThuEnd] = React.useState<string>('0:00 AM')
    const [friStart, setFriStart] = React.useState<string>('0:00 AM')
    const [friEnd, setFriEnd] = React.useState<string>('0:00 AM')
    const [satStart, setSatStart] = React.useState<string>('0:00 AM')
    const [satEnd, setSatEnd] = React.useState<string>('0:00 AM')
    const [availabity, setAvailabity] = React.useState<any>({
        sun:{start:null, end:null},
        mon:{start:null, end:null},
        tue:{start:null, end:null},
        wed:{start:null, end:null},
        thu:{start:null, end:null},
        fri:{start:null, end:null},
        sat:{start:null, end:null},
      })
    const toSetupAvailabityState = {}
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
        profilePic: undefined,
        id:id,
        tutor:tutor,
        why:why,
        zone:zone,
        availabity: availabity
    }

    const usStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    const schoolYear = ['Freshman (High School)','Sophomore (High School)','Junior (High School)','Senior (High School)','Freshman (College)','Sophomore (College)','Junior (College)','Senior (College)'];
    const subjects = ['Algebra', 'Biology', 'English Composition', 'World History','Geometry', 'Chemistry', 'Literature', 'US History','Trigonometry', 'Physics', 'American Literature', 'Government','Calculus', 'Environmental Science', 'British Literature', 'Economics','Introduction to Psychology', 'College Algebra', 'Composition I', 'Introduction to Sociology','Statistics', 'Organic Chemistry', 'Composition II', 'Microeconomics','Advanced Calculus', 'Biochemistry', 'Creative Writing', 'Macroeconomics','Linear Algebra', 'Neuroscience', 'Technical Writing', 'International Relations']
    const usTimeZones = ['(GMT-10:00) Hawaii','(GMT-09:00) Alaska','(GMT-08:00) Pacific Time (US & Canada)','(GMT-07:00) Mountain Time (US & Canada)','(GMT-06:00) Central Time (US & Canada), Mexico City','(GMT-05:00) Eastern Time (US & Canada), Bogota, Lima','(GMT-04:00) Atlantic Time (Canada), Caracas, La Paz'];
    const hours = ['0:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '13:00 PM', '14:00 PM', '15:00 PM', '16:00 PM', '17:00 PM', '18:00 PM', '19:00 PM', '20:00 PM', '21:00 PM', '22:00 PM', '23:00 PM'];
  

    const characterLimit = (e:any) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 200) {
            setAbout(inputValue);
        }
    }

    const characterLimitWhy = (e:any) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 200) {
            setWhy(inputValue);
        }
    }
    const handleSelectChange = (e:any) => {
        setState(e.target.value);
    };
    const handleTimeZone = (e:any) => {
        setZone(e.target.value);
    };
    const handleSun = (e:any) => {
      isSun(e.target.checked)
      const confused = {...availabity}
      if(e.target.checked){
        setSunStart('0:00 AM')
        setSunEnd('0:00 AM')
        confused['sun']['start'] = null
        confused['sun']['end'] = null
      }
      setAvailabity(confused)
    }
    const handleMon = (e:any) => {
      isMon(e.target.checked)
      const confused = {...availabity}
      if(e.target.checked){
        setMonStart('0:00 AM')
        setMonEnd('0:00 AM')
        confused['mon']['start'] = null
        confused['mon']['end'] = null
      }
      setAvailabity(confused)
    }
    const handleTue = (e:any) => {
      isTue(e.target.checked)
      const confused = {...availabity}
      if(e.target.checked){
        setTueStart('0:00 AM')
        setTueEnd('0:00 AM')
        confused['tue']['start'] = null
        confused['tue']['end'] = null
      }
    }
    const handleWed = (e:any) => {
      isWed(e.target.checked)
      const confused = {...availabity}
      if(e.target.checked){
        setWedStart('0:00 AM')
        setWedEnd('0:00 AM')
        confused['wed']['start'] = null
        confused['wed']['end'] = null
      }
    }
    const handleThu = (e:any) => {
      isThu(e.target.checked)
      const confused = {...availabity}
      if(e.target.checked){
        setThuStart('0:00 AM')
        setThuEnd('0:00 AM')
        confused['thu']['start'] = null
        confused['thu']['end'] = null
      }
    }
    const handleFri = (e:any) => {
      isFri(e.target.checked)
      const confused = {...availabity}
      if(e.target.checked){
        setFriStart('0:00 AM')
        setFriEnd('0:00 AM')
        confused['fri']['start'] = null
        confused['fri']['end'] = null
      }
    }
    const handleSat = (e:any) => {
      isSat(e.target.checked)
      const confused = {...availabity}
      if(e.target.checked){
        setSatStart('0:00 AM')
        setSatEnd('0:00 AM')
        confused['sat']['start'] = null
        confused['sat']['end'] = null
      }
    }
    const weekdays = [['Sun', sun, handleSun, sunStart, sunEnd], ['Mon', mon, handleMon, monStart, monEnd], ['Tue',tue, handleTue, tueStart,tueEnd], ['Wed',wed, handleWed, wedStart, wedEnd], ['Thu',thu,handleThu, thuStart, thuEnd], ['Fri',fri,handleFri, friStart, friEnd], ['Sat', sat, handleSat, satStart, satEnd]];
    const HandleSubjects = (e:any) => {
      if(e.target.checked){
        setCourse([...courses, e.target.value])
      } else {
        setCourse(courses.filter(x => x !== e.target.value))
      }
    }
    const handleAvailabity = (e:any) => {
      let day = e.target.parentElement.parentElement.childNodes[0].innerHTML.toLowerCase()

      const startOrEnd = e.target.parentElement.childNodes[0].data.toString()
      const confused = {
        ...availabity,

      }

      switch (day) {
        case 'sun':
            if( startOrEnd === 'Start Time'){ 
              confused['sun']['start'] = e.target.value
              setSunStart(e.target.value)
             }
            if( startOrEnd === 'End Time'){
              confused['sun']['end'] = e.target.value
              setSunEnd(e.target.value)
            }

            break;
        case 'mon':
            if( startOrEnd === 'Start Time'){
              confused['mon']['start'] = e.target.value
              setMonStart(e.target.value)
            }
            if( startOrEnd === 'End Time'){
              confused['mon']['end'] = e.target.value
              setMonEnd(e.target.value)
            }
            break;
        case 'tue':
            if( startOrEnd === 'Start Time'){
              confused['tue']['start'] = e.target.value
              setTueStart(e.target.value)
            }
            if( startOrEnd === 'End Time'){
              confused['tue']['end'] = e.target.value
              setTueEnd(e.target.value)
            }
            break;
        case 'wed':
            if( startOrEnd === 'Start Time'){
              confused['wed']['start'] = e.target.value
              setWedStart(e.target.value)
            }
            if( startOrEnd === 'End Time'){
              confused['wed']['end'] = e.target.value
              setWedEnd(e.target.value)
            }
            break;
        case 'thu':
            if( startOrEnd === 'Start Time'){
              confused['thu']['start'] = e.target.value
              setThuStart(e.target.value)
            }
            if( startOrEnd === 'End Time'){
              confused['thu']['end'] = e.target.value
              setThuEnd(e.target.value)
            }
            break;
        case 'fri':
            if( startOrEnd === 'Start Time'){
              confused['fri']['start'] = e.target.value
              setFriStart(e.target.value)
            }
            if( startOrEnd === 'End Time'){
              confused['fri']['end'] = e.target.value
              setFriEnd(e.target.value)
            }
            break;
        case 'sat':
            if( startOrEnd === 'Start Time'){
              confused['sat']['start'] = e.target.value
              setSatStart(e.target.value)
            }
            if( startOrEnd === 'End Time'){
              confused['sat']['end'] = e.target.value
              setSatEnd(e.target.value)
            }
            break;
        default:
            console.log('ohhhh you fucked up')
    }
      setAvailabity(confused)
    }
    const handleSubmit = async (e:any) => {
      e.preventDefault()
        let img = e.target.childNodes[0].childNodes[0].childNodes[2].childNodes[4].childNodes[1].childNodes[2].files[0]
        if(img !== undefined){
            img = await convertBase64(img)
            userStuff.profilePic = img
        }
        try {
            const response = await fetch(`http://localhost:2020/editprofile${tutor?'T':''}`, {
                method: 'PUT',
                headers:  {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
                body: JSON.stringify(userStuff)
                })
            const data = await response.json()
            window.location.href = "/profile"
        } catch (error) {
            console.log(error)
        }

    }

    const convertBase64 = (file: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        } catch (error) {
          reject(error);
        }
      });
    };

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
        setId(data.userinfo[0]._id)
        setMajor(data.userinfo[0].major)
        setSchool(data.userinfo[0].school)
        setYearInSchool(data.userinfo[0].yearInSchool)
        setCourse(data.userinfo[0].tutor ? data.userinfo[0].courses : data.userinfo[0].subjects )
        setCity(data.userinfo[0].city)
        setState(data.userinfo[0].state)
        setDate(data.userinfo[0].dob)
        setlol(data.userinfo[0].dob)
        setWhy(data.userinfo[0].why)
        isTutor(data.userinfo[0].tutor)
        setZone(data.userinfo[0].zone)
        } catch(err) {
            console.error(err)
        }
    }
    fetchData()
    }, [])

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
        <div className={`sm:col-span-4 ${lol !== '' ? null : 'hidden'}`}>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Date Of Birth</label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="date" value={date} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" onChange={(e:any) => {setDate(e.target.value)} } />
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
          <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">{tutor ? 'Why Should Someone Pick You To Tutor Them?' : 'Why Should  You Get Tutored?'}</label>
          <div className="mt-2">
            <input id="why" name="why"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={why} onChange={characterLimitWhy}/>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">{why.length}/50</p>
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
                    <input id="city" name="city" value={city} type="city" autoComplete="city" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e:any) => {setCity(e.target.value)}}  />
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
                <input type="text" value={school} onChange={(e:any) => setSchool(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
            </div>

            <label htmlFor="year" className="block text-sm font-medium mt-2 leading-6 text-gray-900">Major or Field of Study</label>
            <div className="mt-2">
                <input type="text" value={major} onChange={(e:any) => setMajor(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
            </div>

        </div>

      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">{tutor ? 'Subjects You Can Teach' : 'Subjects Interested In Or Needs Help With'} </legend>
          <div className="mt-6 grid grid-cols-7 gap-x-6 gap-y-6">
            {subjects.map((x:string) => {
                return(
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input id={x.toLowerCase()} name={x.toLowerCase()} type="checkbox" checked={courses.includes(x.toLowerCase())} onChange={HandleSubjects} value={x.toLowerCase()} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor={x.toLowerCase()} className="font-medium text-gray-900">{x}</label>
                        </div>
                    </div>
                )
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Select Your Availability </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">Pick Your Time Zone!</p>
          <div className="mt-2">
            <select id="" name=""   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={zone} onChange={handleTimeZone}>
              {usTimeZones.map((x:string) => (
                    <option value={x}>{x}</option>
                )) }
            </select>
          </div>
          {weekdays.map((x:any) => {
            return (
              <div className='mt-2 flex space-between'>
                <h3 className='mr-5 w-10'>{x[0]}</h3>
                <div className='mr-5'>
                  Start Time
                  <select id="" name=""  disabled={x[1]} onChange={handleAvailabity}  value={x[3]} className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"  >
                    {hours.map((x:string) => (
                          <option value={x}>{x}</option>
                      )) }
                  </select>
                </div>
                <div className='mr-5'>
                  End Time
                  <select id="" name=""  disabled={x[1]} onChange={handleAvailabity}  value={x[4]} className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"  >
                    {hours.map((x:string) => (
                          <option value={x}>{x}</option>
                      )) }
                  </select>
                </div>
                <div className="mr-2 flex flex-col">
                    <label htmlFor="idkwhatthisdoes">Not Available</label>
                    <input type="checkbox" checked={x[1]} onChange={x[2]} className="mt-1" name="" id="idkwhatthisdoes" />
                </div>
             </div>
            )
          })}
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