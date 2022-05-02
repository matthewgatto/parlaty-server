import React from 'react';
import Loader from '../Loader';

const makeButtonClass = (secondary, className, disabled) => {
  let str = secondary ? "primary button align_center light" : "primary button align_center";
  str = className ? `${str} ${className}` : str;
  str = disabled ? `${str} disabled` : str;
  return str
}

export default ({isProcessing, label, onClick, secondary, className, disabled=false}) => (
  <button className={makeButtonClass(secondary, className, disabled)} onClick={onClick} disabled={disabled}>
    {isProcessing ? (
      <Loader fill={secondary ? "#67328d" : "#fff"} />
    ) : (
      label
    )}
  </button>
)
