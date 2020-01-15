import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Logout from '../../containers/Logout';
import styles from './index.module.css';
import logo from '../../assets/images/logo.png';
import {getUserRole} from '../../redux/selectors/auth';

const AuthLinks = () => {
  if(useSelector(getUserRole) !== "ParlatyAdmin"){
    return null
  }
  return(<>
    <NavLink className={styles.link} activeClassName={styles.active} to="/invite">Invite</NavLink>
    <NavLink className={styles.link} activeClassName={styles.active} to="/devices">Devices</NavLink>
  </>)
}
const Layout = ({children}) =>
  <>
    <div className={styles.header}>
      <Link to="/"><img className={styles.logo} src={logo} /></Link>
      <div className={styles.links}>
        <NavLink className={styles.link} activeClassName={styles.active} to="/" exact>Home</NavLink>
        <AuthLinks />
        <NavLink className={styles.link} activeClassName={styles.active} to="/support">Support</NavLink>
        <Logout className={styles.link} />
      </div>
    </div>
    <div className={styles.content}>
      <main>
      {children}
      </main>
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
  </>

export default Layout;
