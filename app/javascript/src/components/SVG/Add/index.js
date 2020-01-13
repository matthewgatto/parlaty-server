import React from 'react';

export default ({stroke, ...props}) => (
  <svg {...props} width="1.4em" height="1.4em" viewBox="0 0 150 150">
    <line fill="none" stroke={stroke || "#67318d"} strokeWidth="46" x1="75" y1="0" x2="75" y2="150"/>
    <line fill="none" stroke={stroke || "#67318d"} strokeWidth="46" x1="0" y1="75" x2="150" y2="75"/>
  </svg>
)
