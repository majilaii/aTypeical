import '../css/nav-bar.css';
import { Link, useNavigate } from 'react-router-dom';
import APIservice from '../APIService';

export default function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  async function logout() {
    const res = await APIservice.logout();
    if (res.message) {
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      navigate('/');
    }
  }

  function toRace() {
    navigate('/race');
  }

  const linkTarget = {
    pathname: '/',
    key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
    state: {
      applied: true,
    },
  };

  return (
    <div className='navContainer'>
      {/*
      TODO look into reload document and see what we can do with hooks
        const [value,setValue] = useState();

        const refresh = ()=>{
          // it re-renders the component
          setValue({});
        }

        then use it in the function onClick={refresh}
      */}
      <Link to={linkTarget} reloadDocument className='link'>
        aTYPEical
      </Link>
      <div className='wrapper'>
        <div className='tagline'>This is a typing app.</div>
      </div>

      <div className='buttons'>
        {isAuthenticated && (
          <Link to='/profile' reloadDocument className='linkLogin'>
            <button className='profile'>PROFILE</button>{' '}
          </Link>
        )}
        {window.location.href !== 'http://localhost:3000/race' && (
          <button className='raceButton' onClick={toRace}>
            {' '}
            RACE{' '}
          </button>
        )}
        {isAuthenticated === false ? (
          <Link to='/login' className='linkLogin'>
            <button className='logIn'>LOGIN</button>{' '}
          </Link>
        ) : (
          <button className='logIn' onClick={logout}>
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
}
