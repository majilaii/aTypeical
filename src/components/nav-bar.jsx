import '../css/nav-bar.css'
import { Link, useNavigate, Redirect, useOutletContext, redirect} from "react-router-dom";
import { useState, useEffect } from 'react';
import APIservice from '../APIService';

export default function NavBar({isAuthenticated, setIsAuthenticated}) {

    const navigate = useNavigate()

    async function logout () {
        const res = await APIservice.logout()
        if(res.message) {
            localStorage.removeItem('userData')
            setIsAuthenticated(false)
            navigate('/')
        }
    }

    const linkTarget = {
        pathname: "/",
        key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
        state: {
          applied: true
        }
    }

    return(
        <div className='navContainer'>
            <Link to={linkTarget} reloadDocument className='link'>
            aTYPEical
            </Link>
            <div className="wrapper">
            <div className="tagline">
            This is a typing app.
            </div>
            </div>
           
            <div className='buttons'>
            {isAuthenticated ? <Link to='/profile' className="linkLogin"><button className='profile'>PROFILE</button> </Link> : null}
            <button className='raceButton' > RACE </button>
            { isAuthenticated === false ? <Link to='/register' className="linkLogin"><button className='logIn'>LOGIN</button> </Link> : <button className='logIn' onClick={logout}>LOGOUT</button> }
            </div>
        </div>
     
    )
}