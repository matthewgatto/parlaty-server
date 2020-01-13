import React from 'react';
import Add from '../SVG/Add';

export default ({onClick}) => (
  <div onClick={onClick} className="step_header color">
    <Add className="add_step_icon" />
    <div className="step_header__text">Add Step</div>
  </div>
)
