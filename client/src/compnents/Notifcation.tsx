import React from 'react'
import Header from './Header'
import NavMenu from './NavMenu'
import MessagesLi from './MessagesLi'
import TutorLi from './TutorLi'
import FeedbackLi from './FeedbackLi'
import { Fragment } from 'react'
function Notifcation(props:any) {
    console.log(props)
    const [display, setDisplay] = React.useState<string>('All Notifications')
    const displayNoti = (e:any) => {
        setDisplay(e.target.textContent)
    }
  return (
    <>
      <Header/>
      <div className="flex">
        <NavMenu/>
        <div className="w-full">
            <div>
                <h1 className='flex justify-center pt-10 items-center font-bold text-2xl'>Your Notifcations</h1>
            </div>
            <div className=" flex justify-center items-center w-1/2 m-auto ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex items-center justify-between h-16 ">
                    <div className="flex">
                        {/* Navigation Links */}
                        <a href="#" onClick={displayNoti} className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">All Notifications</a>
                        <a href="#" onClick={displayNoti} className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Messages</a>
                        <a href="#" onClick={displayNoti} className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Feedback</a>
                        <a href="#" onClick={displayNoti} className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tutor Sessions</a>
                    </div>
                    </div>
                </div>
            </div>
            {display === 'All Notifications' ? (
                <div className="max-w-lg mx-auto items-center">
                <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                    <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                            <img className="w-full h-full object-cover rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="" />
                        </div>
                    </div>
                    <div>
                        <span className="font-mono">Emma would like to connect with you</span>
                    </div>
                    <div className="flex gap-2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            ) : display === 'Messages' ? (
                <MessagesLi/>
            ): display === "Feedback" ? (
                <FeedbackLi/>
            ): display === 'Tutor Sessions' ? (
                <TutorLi/>
            ): null}

        </div>
      </div>
    </>
  )
}

export default Notifcation
