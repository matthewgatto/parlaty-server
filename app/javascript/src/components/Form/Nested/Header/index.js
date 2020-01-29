import React from 'react';
import Bar from '../../../Bar/Small';
import Menu from '../../../../containers/Menu';
import Add from '../../../SVG/Add';

export default ({idx, handleDuplicateClick, disabled, isCreating, handleDeleteClick, ...props}) => (
  <Bar
    {...props}
    left={isCreating && <Add className={styles.icon} />}
    right={!isCreating && <Menu idx={idx} handleDuplicateClick={handleDuplicateClick} handleDeleteClick={handleDeleteClick} disabled={disabled} />}
  />
)
