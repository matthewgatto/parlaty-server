import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './index.module.css';
import logo from '@assets/images/logo.png';
import {useSelector} from "react-redux";
import {getMessage} from '@selectors/message';

const Layout = ({children, role, logout}) => {
  const isAdmin = role === "ParlatyAdmin" || role === "ClientAdmin";
  const message = useSelector(getMessage);
  const isMessage = message.message;
  return(
    <>
      <div className={styles.header}>
        { isMessage ?
          <img className={styles.logo} src={logo} /> :
          <Link to="/"><img className={styles.logo} src={logo} /></Link>
        }
        <div className={styles.links}>
          {!isMessage && <NavLink className={styles.link} activeClassName={styles.active} to="/" exact>Home</NavLink>}
          {isAdmin && <NavLink className={styles.link} activeClassName={styles.active} to="/users">Users</NavLink>}
          <a className={styles.link} activeClassName={styles.active} href="mailto:support@parlaty.com">Support</a>
          {role && <Link to="/" onClick={logout} className={styles.link}>Logout</Link>}
        </div>
      </div>
      <div className={styles.content}>
        <main>
        {children}
        </main>
        <div className={styles.footer}>
          <div>&copy; Copyright 2020-2022 Parlaty</div>
          <div className={styles.social}>
            <div>Facebook</div>
            <div>Instagram</div>
            <div>Twitter</div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}


export default Layout;
