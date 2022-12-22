import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectUser } from '../../redux/slices/userLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './Navigation.css';
import logo from '../../assets/icons/logo_color.svg'

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className='nav-bar'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className='nav-logo'>
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className='nav-links'>
        <Link to='/breakfast'>Breakfast</Link>
        <FontAwesomeIcon
          icon={faCircle}
          color='#F0972A'
          className='nav-link-icons'
        />
        <Link to='/brunch'>Brunch</Link>
        <FontAwesomeIcon
          icon={faCircle}
          color='#F0972A'
          className='nav-link-icons'
        />
        <Link to='/lunch'>Lunch</Link>
        <FontAwesomeIcon
          icon={faCircle}
          color='#F0972A'
          className='nav-link-icons'
        />
        <Link to='/dinner'>Dinner</Link>
      </div>
      {user.isLoggedIn ? (
        <div className='logged-in-navigation'>
          <Link
            to={`/my-recipes/${user.userId}`}
            style={{
              borderBottom: '3px solid #A5A5A5',
              color: '#96BB36',
            }}
          >
            MY RECIPES
          </Link>
          <FontAwesomeIcon
            icon={faCircle}
            color='#626262'
            className='logged-in-nav-icons'
          />
          <Link
            to={`/profile/${user.userId}`}
            style={{
              borderBottom: '3px solid #A5A5A5',
              paddingBottom: '1px',
              color: '#F0972A',
            }}
          >
            MY PROFILE
          </Link>
          <FontAwesomeIcon
            icon={faCircle}
            color='#626262'
            className='logged-in-nav-icons'
          />
          <Link
            to='/'
            style={{
              borderBottom: '3px solid #A5A5A5',
              paddingBottom: '1px',
              color: '#B5B5B4',
            }}
            onClick={() => {
              dispatch(
                logout({
                  userId: '',
                  isLoggedIn: false,
                })
              );
              localStorage.removeItem('token');
            }}
          >
            LOG OUT
          </Link>
        </div>
      ) : (
        <div className='nav-login-buttons'>
          <Link to='/login'>
            <button className='login-button'>LOG IN</button>
          </Link>
          <div
            style={{
              marginLeft: '1rem',
              marginRight: '1rem',
              fontSize: '1.1rem',
              font: 'normal normal 900 16px/21px Roboto',
              color: '#f0972a',
            }}
          >
            or
          </div>
          <Link to='/register'>
            <button className='register-button'>CREATE ACCOUNT</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navigation;
