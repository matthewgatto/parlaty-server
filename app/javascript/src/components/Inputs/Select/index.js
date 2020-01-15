import React from 'react';
import Triangle from '../../SVG/Triangle';
import styles from './index.module.css';

export const withSelectContainer = WrappedComponent => ({className, ...props}) => (
  <div className={className ? `${styles.container} align_center ${className}` : `${styles.container} align_center`}>
    <WrappedComponent {...props} />
    <Triangle className={styles.icon} />
  </div>
)

export default ({onChange, name, value, options}) => (
  <select onChange={onChange} name={name} value={value}>
    {(options && options.length > 0) ? (
      options.map(option =>
        <option key={option.value} value={option.value}>{option.label}</option>
      )
    ) : null}
  </select>
)
