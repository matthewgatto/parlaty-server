import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm';
import FormErrorMessage from '../../containers/FormErrorMessage';
import Polygon from '../SVG/PolygonH';
import styles from './index.module.css';

const LoginPage = () =>
  <div className={styles.container}>
    <div className={styles.topPolygonContainer}>
      <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
      <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
    <div className={styles.header}>Log into Parlaty<sup className={styles.tm}>&#8482;</sup></div>
    <div className={styles.subheader}>Or <Link to="/#" className={styles.underline}>Create Account</Link></div>
    <div className={styles.error}>
      <FormErrorMessage />
    </div>
    <LoginForm />
    <Link to="/forgot-password" className={styles.link}>I forgot my username/password</Link>
    <div className={styles.bottomPolygonContainer}>
      <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
      <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
  </div>

export default LoginPage
