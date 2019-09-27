import React from 'react';
import Text from '../Text';
import styles from './index.module.css';

const FormCloseButton = ({closeForm}) => <div className={styles.container} onClick={closeForm}><Text color="primary">Cancel</Text></div>

export default FormCloseButton;
