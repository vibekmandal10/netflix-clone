import React from 'react';
import logo from '../../logo.png';
import {Link} from 'react-router-dom';
import {ImSearch} from 'react-icons/im';

const Header = () => {
  return (
    <nav className='header'>
        <img src={logo} alt="" />
        <div>
            <Link to="/tvshow">Tv Shows</Link>
            <Link to="/Movies">Movies</Link>
            <Link to="/tvshow">Recently Added</Link>
            <Link to="/mylist">My List</Link>
        </div>
        <ImSearch />
    </nav>
  )
}

export default Header