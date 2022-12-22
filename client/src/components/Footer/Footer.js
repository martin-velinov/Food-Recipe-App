import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo_white.svg'
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer-wrapper'>
      <div className='footer-resize'>
        <div className='footer-logo'>
          <img src={logo} alt="" />
        </div>
        <div className='footer-nav'>
          <Link to='/breakfast'>Breakfast</Link>
          <FontAwesomeIcon icon={faCircle} className='footer-nav-icons' />
          <Link to='/brunch'>Brunch</Link>
          <FontAwesomeIcon icon={faCircle} className='footer-nav-icons' />
          <Link to='/lunch'>Lunch</Link>
          <FontAwesomeIcon icon={faCircle} className='footer-nav-icons' />
          <Link to='/dinner'>Dinner</Link>
        </div>
        <div className='footer-copyright'>
          <p>Baby’s Food Place copyright © 2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
