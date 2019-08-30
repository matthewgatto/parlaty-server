import React from 'react';
import styles from './index.module.css';

const LoginForm = ({onSubmit, onChange, email, error, password}) =>
  <form className={styles.form} onSubmit={onSubmit}>
    {error && <div className={styles.error}>{error}</div>}
    <input autoFocus type="text" className={styles.input} name="email" value={email} onChange={onChange} placeholder="Email/Username" />
    <input type="password" className={styles.input} name="password" value={password} onChange={onChange} placeholder="Password" />
    <button className={styles.submitBtn}>Log In</button>
  </form>

export default LoginForm;
