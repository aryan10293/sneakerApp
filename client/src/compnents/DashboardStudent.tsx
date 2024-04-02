import React from 'react'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import Header from './Header';
import NavMenu from './NavMenu';
import { Link } from 'react-router-dom';
function DashboardStudent(props:any) {
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
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis corrupti aut illum aspernatur aliquid veritatis? Praesentium illo eum modi dolorum incidunt veniam labore! Atque ipsa laudantium magnam reiciendis consequuntur eos, unde eligendi voluptate quod blanditiis repellat rem beatae itaque maxime architecto doloremque necessitatibus. Esse eos vero et, obcaecati nobis dolorem expedita necessitatibus nostrum sit molestiae iusto veritatis accusamus pariatur nisi facilis dolorum error aperiam alias laudantium voluptates aut! Nulla recusandae iusto voluptatibus fugit, dolores odio inventore laboriosam architecto, maiores ratione corrupti sint atque, at consectetur explicabo natus. Corporis atque, saepe qui sequi, veritatis maxime impedit necessitatibus, cupiditate nam delectus quos?</div>
    </div>
    </>
  )
}

export default DashboardStudent
