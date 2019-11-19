import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../../containers/Logout';
import styles from './index.module.css';
import logo from '../../assets/images/logo.png';

const Layout = ({children}) =>
  <div className={styles.container}>
    <div className={styles.header}>
      <img className={styles.logo} src={logo} />
      <div className={styles.links}>
        <NavLink className={styles.link} activeClassName={styles.active} to="/" exact>Home</NavLink>
        <NavLink className={styles.link} activeClassName={styles.active} to="/support">Support</NavLink>
        <Logout className={styles.link} />
      </div>
    </div>
    <div className={styles.content}>
      {children}
    </div>
    <div className={styles.footer}>
      <div>&copy; Copyright 2019 Parlaty</div>
      <div className={styles.social}>
        <div>Facebook</div>
        <div>Instagram</div>
        <div>Twitter</div>
      </div>
      <div>Lorem Ipsum</div>
    </div>
  </div>

export default Layout;
