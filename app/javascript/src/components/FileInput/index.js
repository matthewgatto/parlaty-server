import React from 'react';
import Text from '../Text';
import Close from '../SVG/Close';
import styles from './index.module.css';

const FileInput = ({setInputRef, onClick, label, fileName, hasValue, onChange}) =>
  <span className={styles.container}>
    {label && <Text>{label}</Text>}
  <span className={styles.button} onClick={onClick}>
  <div className={styles.name}>{fileName ? fileName : "Upload"}</div>
  {hasValue ? (
    <Close className={styles.icon} />
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
