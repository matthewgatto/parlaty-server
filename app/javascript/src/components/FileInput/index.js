import React from 'react';
import Text from '../Text';
import styles from './index.module.css';

const FileInput = ({setInputRef, onClick, label, fileName, hasValue, onChange}) =>
  <span className={styles.container}>
    {label && <Text>{label}</Text>}
  <span className={styles.button} onClick={onClick}>
  <div className={styles.name}>{fileName ? fileName : "Upload"}</div>
  {hasValue ? (
    <svg className={styles.icon} fill="#67318d" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
  ) : (
    <svg className={styles.icon} width="1em" height="1em" fill="#67318d" viewBox="0 0 297.962 322.89">
      <polygon points="148.981,97.066 216.491,177.913 296.893,177.913 148.981,0.78 1.069,177.913 81.471,177.913"/>
      <polygon points="148.981,241.543 216.491,322.39 296.893,322.39 148.981,145.257 1.069,322.39 81.471,322.39"/>
    </svg>
  )}
  </span>
    <input ref={setInputRef} className={styles.hidden} type="file" onChange={onChange} />
  </span>

export default FileInput;
