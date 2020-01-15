import React from 'react';
import Visual from '../Visual';
import Placeholder from '../../Placeholder';

export default ({visuals, handleCloseIconClick}) => visuals.length > 0 ? (
    visuals.map(({id,src}) => <Visual key={id} id={id} src={src} handleCloseIconClick={handleCloseIconClick} />)
  ) : (
    <Placeholder text="This procedure currently has no images" />
  )
