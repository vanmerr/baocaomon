import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={cx('navbar')}>
      <div className={cx('navbar-brand')}>
        {/* Toggle button for mobile menu */}
        <label htmlFor="check" className={cx('menuButton')}>
          <input id="check" type="checkbox" onChange={toggleMenu} checked={isActive} />
          <span className={cx('top')}></span>
          <span className={cx('mid')}></span>
          <span className={cx('bot')}></span>
        </label>
      </div>
      {/* Menu items */}
      <div className={cx('navbar-menu', { 'is-active': isActive })}>
        <div className={cx('navbar-end')}>
          <Link to="/" className={cx('navbar-item')}>
            Home
          </Link>
          <Link to="/about" className={cx('navbar-item')}>
            About
          </Link>
          <Link to="/contact" className={cx('navbar-item')}>
            Contact
          </Link>
          {/* Add more menu items as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
