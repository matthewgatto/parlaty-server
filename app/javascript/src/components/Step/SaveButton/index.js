import React from 'react';
import Loader from '../../Loader';

export default ({isProcessing, onClick}) => (
  <div className="step_button" onClick={isProcessing ? undefined : onClick}>
    {isProcessing ? <Loader fill="#fff" /> : <div className="step_button__text">Save</div>}
  </div>
)
