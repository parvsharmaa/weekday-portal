import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../utils/sidebarUtils';
import { IconContext } from 'react-icons';
import { Typography } from '@mui/material';
import Weekday from '../utils/weekday.png';
import '../App.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <IconContext.Provider value={{ color: 'undefined' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <Typography
          variant='h4'
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
            fontWeight: 'bold',
            paddingTop: '15px',
            paddingLeft: '20px',
            width: '100%',
            height: '100%',
          }}
        >
          <img alt='weekday' src={Weekday} />
        </Typography>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;
