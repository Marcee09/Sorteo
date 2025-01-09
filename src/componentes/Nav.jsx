import React, { useContext } from 'react';
import './Nav.css';
import ImageSun from '../assets/sun.svg';
import Logo from '../assets/logo.svg';
import ImageMoon from '../assets/moon.svg';
import { ThemeContext } from './ThemeContext';

const Nav = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`navbar ${darkMode ? 'dark-theme' : ''}`}>
      <div className="logo">
        <img src={Logo}/>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <img
              src={darkMode ? ImageSun : ImageMoon}
              className="theme-icon"
              onClick={toggleTheme}
              alt="Toggle theme"
            />
          </li>
          <li>
            <a href="#idioma">En</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;

