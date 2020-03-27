import React from 'react';
import { Link } from 'react-router-dom'
import SubmitButton from '@containers/SubmitButton';
import styles from './index.module.css';

export default ({handleSubmit, formKey, cancel}) => (
  <div className={`${styles.buttons} align_center`}>
    <Link to={cancel || '/'} className={styles.label}>
      Cancel
    </Link>
    <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" />
  </div>
)
