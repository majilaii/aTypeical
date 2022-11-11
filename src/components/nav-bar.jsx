import '../css/nav-bar.css'
import { Link, useNavigate, Redirect } from "react-router-dom";

export default function NavBar() {

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
            <div className='buttons'>
            <button className='raceButton' > RACE </button>
            <Link to='/register' className="linkLogin"><button className='logIn'>LOGIN</button> </Link>
            </div>
        </div>
     
    )
}