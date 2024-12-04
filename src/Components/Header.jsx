import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='header'>
      <div className="header-left">
        
      </div>
      <div className="header-right">
        <div className="dropdown">
        <button 
                className='btn btn-primary dropdown-toggle' 
                type='button' 
                data-bs-toggle='dropdown' 
                id='accountDropdown' 
                aria-expanded='false'
            >
                Account
            </button>
            <ul className='dropdown-menu dropdown-menu-dark' aria-labelledby='accountDropdown'>
                {isLoggedIn ? (
                    <>
                        <li><Link className="dropdown-item" to='/profile'>Profile</Link></li>
                        <li>
                            <button 
                            className="dropdown-item" 
                            type='button' 
                            onClick={()=>{setIsLoggedIn(false)}}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                    ) : (
                    <>
                        <li><Link className='dropdown-item' to="/login">Login</Link></li>
                        <li><Link className="dropdown-item" to='/register'>Register</Link></li>
                    </>
                    )}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
