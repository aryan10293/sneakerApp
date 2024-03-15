import React from 'react'
import { Fragment, ChangeEvent, FormEvent } from 'react'
import { Link,  } from 'react-router-dom'
function Register() {
    const [email, setEmail] = React.useState<string>('')
    const [confirmPassword, setConfirmPassword] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [fullName, setFullName] = React.useState<string>('')
    const [Tutor, setTutor] = React.useState<boolean>(true)
    
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const userInfo = {
        email: email,
        fullName: fullName,
        password: password,
        confirmPassword: confirmPassword,
        tutor: Tutor
    }
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">LearnLeap</h1>
          <p className="text-white mt-1">Unlock Learning Potential, One Session at a Time!</p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Welcome In!</h1>
          <p className="text-sm font-normal text-white mb-7">coding is fun</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username" />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" type="radio" name="tutor" id="student" value={'student'} />
            <label htmlFor="tutor">Student</label>
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" checked  type="radio" name="tutor" id="tutor" value={'tutor'} />
            <label htmlFor="tutor">Tutor</label>
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input className="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password" />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <input className="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Confirm Password" />
          </div>
          
          
          <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default Register
