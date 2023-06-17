import React from 'react'
import '../home/navheading.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

const NavHeading = () => {
  return (
    <>
        <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
              src='https://plugins.miniorange.com/wp-content/uploads/2022/09/lms-plugin.webp'
              height='30'
              alt=''
              loading='lazy'
            />
            
          </MDBNavbarBrand>
          <MDBNavbarBrand href='#'>
           <ul >
            
                <NavLink className='ul' to="/">Login</NavLink>
                <NavLink className='ul' to="/register">Register</NavLink>
                <NavLink className='ul' to="/login">Logout</NavLink>
           </ul>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default NavHeading