import React from 'react';
import { Fragment } from 'react';
import NavMenu from './NavMenu';
import Header from './Header';
import { Link , useParams} from 'react-router-dom';
//style={'background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80');}" style="transform: translateZ(0px)"
function ProfilePage(props:any) {
  const [userData,setUserData] = React.useState<any[]>([])
  const [tutor, isTutor] = React.useState<boolean>(false)
    React.useEffect(() => {
    const fetchData = async() => {
      try {
        const reg = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
        })
        const data = await reg.json()
        setUserData(data.userinfo)
        isTutor(data.userinfo[0].tutor)

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
        <NavMenu />
        <div className="px-6 div overflow-auto">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="relative">
                <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="py-6 px-3 mt-32 sm:mt-0">
                <Link to='/settings'>
                  <button className="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                  Edit Profile
                </button>
                </Link>
              </div>

            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Courses</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Rating</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Reviwes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
           <div className="flex justify-center items-center">
              <div>
                <img className="object-cover w-20 h-20 rounded-full" src={userData.length === 0 ? null : userData[0].img} alt="img of user" />
              </div>
            </div>
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {userData.length === 0 ? null : (
                `${userData[0].userName}`
              )}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              {userData.length === 0 ? null : (
                `${userData[0].city.toUpperCase()}, ${userData[0].state.toUpperCase()}`
              )}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex  justify-center">
              <div className="w-full lg:w-9/12 px-4 overflow-auto">
                <h2 className='mb-5 font-semibold leading-normal text-2xl text-blueGray-700 '>About Me</h2>
                <p className="mb-4  idk text-lg leading-relaxed text-blueGray-700">
                  {userData.length === 0 ? null : userData[0].bio} 
                </p>
              </div>
              <div className="w-full lg:w-9/12 px-4">
                <h2 className='mb-5 font-semibold leading-normal text-2xl text-blueGray-700 '>Educational Information</h2>
                  <div>
                    <td className="pl-5 pr-3 whitespace-no-wrap">
                      <div className="text-gray-400">YEAR</div>
                    </td>

                    <td className="px-2 py-2 whitespace-no-wrap">
                        <div className="leading-5 text-gray-500 font-medium">{userData.length === 0 ? null : userData[0].yearInSchool.toUpperCase()} </div>
                    </td>
                  </div>

                  <div>
                      <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-gray-400">SCHOOL</div>
                      </td>

                      <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-gray-500 font-medium">{userData.length === 0 ? null : userData[0].school.toUpperCase()} </div>
                      </td>
                  </div>

                  <div>
                      <td className="pl-5 pr-3 whitespace-no-wrap">
                          <div className="text-gray-400">MAJOR</div>
                      </td>

                      <td className="px-2 py-2 whitespace-no-wrap">
                          <div className="leading-5 text-gray-500 font-medium">{userData.length === 0 ? null : userData[0].major.toUpperCase()} </div>
                      </td>
                  </div>
              </div>
              <div className="w-full lg:w-9/12 px-4">
                <h2 className='mb-5 font-semibold leading-normal text-2xl text-blueGray-700 '> Areas Of Interest</h2>
                  {userData.length === 0 ? null : 
                      tutor ? (
                        userData[0].courses.map((x:string) => {
                        return (
                          <div>{x}</div>
                        )
                      })
                      ) : (
                        userData[0].subjects.map((x:string) => {
                        return (
                          <div>{x}</div>
                        )
                      })
                      )
                  } 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
