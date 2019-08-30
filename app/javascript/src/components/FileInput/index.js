import React from 'react';
import styles from './index.module.css';

const FileInput = ({setInputRef, onClick, label, fileName, hasValue, onChange}) =>
  <span className={styles.container}>
    {label && <span className={styles.label}>{label}</span>}
  <span className={styles.button} onClick={onClick}>
  <div className={styles.name}>{fileName ? fileName : "Upload"}</div>
  {hasValue ? (
    <svg className={styles.icon} fill="#67318d" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
  ) : (
    <svg className={styles.icon} fill="#67318d" width="1.2em" height="1.2em" viewBox="0 0 284.929 284.929">
  		<path d="M17.128,167.872c1.903,1.902,4.093,2.854,6.567,2.854c2.474,0,4.664-0.952,6.567-2.854L142.466,55.666l112.208,112.206    c1.902,1.902,4.093,2.854,6.563,2.854c2.478,0,4.668-0.952,6.57-2.854l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.563    c0-2.475-0.951-4.665-2.847-6.567L149.028,7.419c-1.901-1.906-4.088-2.853-6.562-2.853s-4.665,0.95-6.567,2.853L2.856,140.464    C0.95,142.367,0,144.554,0,147.034c0,2.468,0.953,4.658,2.856,6.561L17.128,167.872z"/>
  		<path d="M149.028,117.055c-1.901-1.906-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,250.1    C0.95,252.003,0,254.192,0,256.67c0,2.472,0.953,4.661,2.856,6.564l14.272,14.276c1.903,1.903,4.093,2.848,6.567,2.848    c2.474,0,4.664-0.951,6.567-2.848l112.204-112.209l112.208,112.209c1.902,1.903,4.093,2.852,6.563,2.852    c2.478,0,4.668-0.948,6.57-2.852l14.274-14.276c1.902-1.903,2.847-4.093,2.847-6.564c0-2.478-0.951-4.667-2.847-6.57    L149.028,117.055z"/>
    </svg>
  )}
  </span>
    <input ref={setInputRef} className={styles.hidden} type="file" onChange={onChange} />
  </span>

export default FileInput;
