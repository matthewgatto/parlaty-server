import React from 'react';
import Triangle from '../SVG/Triangle';

export const withSelectContainer = WrappedComponent => ({className, ...props}) => (
  <div className={className ? `select ${className}` : "select"}>
    <WrappedComponent {...props} />
    <Triangle className="select__icon" />
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
