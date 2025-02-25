
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../Asset/Images/Netflix-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.header_outer_container}>
      <div className={styles.header_container}>
        <div className={styles.header_left}>
          <img src={logo} alt="Netflix-logo" width={"100"} />
          {!isDesktop && (
            <div className={styles.menu_toggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation Menu">
              <MenuIcon />
            </div>
          )}
          <nav>
            <ul className={`${styles.ul_nav} ${menuOpen || isDesktop ? styles.show : ''}`}>
              <li>Home</li>
              <li>TvShow</li>
              <li>Movies</li>
              <li>Latest</li>
              <li>My List</li>
              <li>Browse by Languages</li>
            </ul>
          </nav>
        </div>

        <div className={styles.header_right}>
          <ul className={styles.right_ul_nav}>
            <li>
              {/* Navigate to the search page when clicked */}
              <Link to="/search" aria-label="Search">
                <SearchIcon />
              </Link>
            </li>
            <li><NotificationsNoneIcon /></li>
            <li><Link to='/' aria-label="Login"><AccountBoxIcon /></Link></li>
            <li><ArrowDropDownIcon /></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
