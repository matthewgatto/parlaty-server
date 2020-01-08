import React from 'react';

export default ({title, right}) => (
  <div className="header_bar">
    <span className="header_bar__title">{title}</span>
    {right}
  </div>
)
