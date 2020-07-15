import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './index.module.css';
import logo from '@assets/images/logo.png';

const Layout = ({children, role, logout}) => {
  const isAdmin = role === "ParlatyAdmin" || role === "ClientAdmin";
  return(
    <>
      <div className={styles.header}>
        <Link to="/"><img className={styles.logo} src={logo} /></Link>
        <div className={styles.links}>
          <NavLink className={styles.link} activeClassName={styles.active} to="/" exact>Home</NavLink>
          {isAdmin && <NavLink className={styles.link} activeClassName={styles.active} to="/users">Users</NavLink>}
          <NavLink className={styles.link} activeClassName={styles.active} to="/support">Support</NavLink>
          {role && <Link to="/" onClick={logout} className={styles.link}>Logout</Link>}
        </div>
      </div>
      <div className={styles.content}>
        <main>
        {children}
        </main>
        <div className={styles.footer}>
          <div>&copy; Copyright 2020 Parlaty</div>
          <div className={styles.social}>
            <div>Facebook</div>
            <div>Instagram</div>
            <div>Twitter</div>
          </div>
          <div>Lorem Ipsum</div>
        </div>
      </div>
    </>
  )
}


export default Layout;
