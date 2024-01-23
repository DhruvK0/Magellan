import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCalendar, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router';
import { GiShipWheel } from "react-icons/gi";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Magellan_Logo from "../assets/Magellan.svg"

export function BasicMenu() {
  const { logOut, user} = useUserAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfile = () => {
    try {
      navigate("/profile");
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlePlan = () => {
    try {
      navigate("/plan");
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleLogin = () => {
    try {
      navigate("/login");
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FontAwesomeIcon color="black" icon={faBars} size="xl" className='mt-1.5' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handlePlan} >Plan a Trip</MenuItem>
        <MenuItem onClick={handleProfile}>My Profile</MenuItem>
        {user ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : <MenuItem onClick={handleLogin}>Login</MenuItem>}
      </Menu>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="p-4 grid grid-cols-12" spacing={2}>
      {/* Left Section */}
      <div>
      </div>
      <div className="flex items-center space-x-2 col-span-8">
        {/* Logo */}
        <Link to="/" className="flex items-center text-3xl font-bold text-black">
          <img src={Magellan_Logo} alt="Magellan" className="w-14 h-14 mr-3" />
          <span className='mb-1'>AYVOO</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="relative col-span-2 text-right pt-1">
        <BasicMenu />
      </div>
    </nav>
  );
};

export default Navbar;