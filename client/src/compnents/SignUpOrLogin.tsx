import React from 'react'
import { Link } from 'react-router-dom'
function SignUpOrLogin() {
  return (
    <div className='flex space-between'>
      <button><Link to='/register'>Register</Link></button>
      {' '}
      <button><Link to='/login'>Login</Link></button>
      {' '}
      <button><Link to='/home'>Home</Link></button>
      {' '}
    </div>
  )
}

export default SignUpOrLogin
