import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@containers/LoginForm';
import Polygon from '../SVG/PolygonH';
import styles from './index.module.css';

const SignUpPage = ({onSubmit}) =>
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.topPolygonContainer}>
        <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
        <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
      <div className={styles.header}>Create a Parlaty account<sup className={styles.tm}>&#8482;</sup></div>
      <div className={styles.subheader}>Or <Link to="#" className={styles.underline}>Login</Link></div>
      <LoginForm />
      <div className={styles.bottomPolygonContainer}>
        <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
        <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
    </div>
  </div>

export default SignUpPage
