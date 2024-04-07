import React from 'react'
import Profile from '../compnents/Profile'
import ProfileID from '../compnents/ProfileID'
import { useParams } from 'react-router-dom'
function ProfilePage() {
  const { id } = useParams();

  return (
    <ProfileID id={id}/>
  )
}

export default ProfilePage
