import React from 'react';
import Loader from '../Loader';

const makeButtonClass = (secondary, className) => {
  const str = secondary ? "primary button align_center light" : "primary button align_center";
  return className ? `${str} ${className}` : str
}

export default ({isProcessing, label, onClick, secondary, className}) => (
  <button className={makeButtonClass(secondary, className)} onClick={onClick}>
    {isProcessing ? (
      <Loader fill={secondary ? "#67328d" : "#fff"} />
    ) : (
      label
    )}
  </button>
)
