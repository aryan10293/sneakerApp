import React from 'react'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import Header from './Header';
import NavMenu from './NavMenu';
import { Link } from 'react-router-dom';

function DashboardTutor(props:any) {
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
  return (
    <>
    <Header img={props.idk.img}/>
    <div className='flex'>
      <NavMenu />
    </div>
    </>
  )
}

export default DashboardTutor
