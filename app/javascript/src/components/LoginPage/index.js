import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm'
import styles from './index.module.css';
import top from '../../assets/images/top.png';
import bottom from '../../assets/images/bottom.png';

const LoginPage = ({onSubmit}) =>
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.header}>Log into Parlaty</div>
      <div className={styles.subheader}>Or <Link to="#" className={styles.underline}>Create Account</Link></div>
      <LoginForm />
      <Link to="#" className={styles.link}>I forgot my username/password</Link>
      <img className={styles.top} src={top} />
      <img className={styles.bottom} src={bottom} />
    </div>
  </div>

export default LoginPage
