import React from 'react';
import Triangle from '@components/SVG/Triangle';
import styles from './index.module.css';



export const withSelectContainer = WrappedComponent => ({className, ...props}) => {
  let classStr = `${styles.container} align_center`;
  if(className) classStr += " "+className;
  if(props.disabled) classStr += " "+styles.disabled;
  return(
    <div className={classStr}>
      <WrappedComponent {...props} />
      <Triangle className={styles.icon} />
    </div>
  )
};

export default ({options, placeholder, ...props}) => (
  <select {...props}>
    {placeholder && <option value="" disabled={props.unclearable}>{placeholder}</option>}
    {(options && options.length > 0) ? (
      options.map(option =>
        <option key={option.value} value={option.value}>{option.label}</option>
      )
    ) : null}
  </select>
)
