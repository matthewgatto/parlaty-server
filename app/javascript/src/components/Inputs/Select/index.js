import React from 'react';
import Triangle from '@components/SVG/Triangle';
import styles from './index.module.css';

export const withSelectContainer = WrappedComponent => ({className, ...props}) => (
  <div className={className ? `${styles.container} align_center ${className}` : `${styles.container} align_center`}>
    <WrappedComponent {...props} />
    <Triangle className={styles.icon} />
  </div>
)

export default ({onChange, name, value, options, placeholder}) => (
  <select onChange={onChange} name={name} value={value}>
    {placeholder && <option value="" selected>{placeholder}</option>}
    {(options && options.length > 0) ? (
      options.map(option =>
        <option key={option.value} value={option.value}>{option.label}</option>
      )
    ) : null}
  </select>
)
