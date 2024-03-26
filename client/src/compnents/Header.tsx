import React from 'react'

function Header(props:any) {
    const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const activeClass = "bg-gray-800"; // Define your active class
    const inactiveClass = "bg-gray-900"; 
        const [okay,setOkay] = React.useState<any>('')
    const fetchData = async() => {
        try {
            const reg = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}`},
            })
            const data = await reg.json()
        //    console.log(data)
            if(data.success){
            setOkay(data.userinfo[0])
            }
            } catch(err) {
                console.error(err)
            }
        }
      React.useEffect(() => {fetchData()}, [])
  return (
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600 header">
        <div className="flex items-center">
          <button className="text-gray-500 focus:outline-none lg:hidden" onClick={toggleDropdown}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative mx-4 lg:mx-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <input className="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" placeholder="Search" />
          </div>
        </div>

        <div className="flex items-center">
          <button className="flex mx-4 text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative">
            <button className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none" onClick={toggleDropdown}>
              <img className="object-cover w-full h-full" src={okay.img} alt="Your avatar" />
            </button>

            {dropdownOpen && (
              <div className="fixed inset-0 z-10 w-full h-full" onClick={toggleDropdown}></div>
            )}

            {dropdownOpen && (
              <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                <a href="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Home</a>
                <a href="/schedules" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Schedule</a>
                <a href="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Messages</a>
                <a href="/video" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Video Chat</a>
                <a href="/feedback" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Feedback</a>
                <a href="/notifcation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Notifcations</a>
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Log out</a>
              </div>
            )}
          </div>
        </div>
    </header>
  )
}

export default Header
