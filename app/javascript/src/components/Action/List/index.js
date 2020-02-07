import React from 'react';
import Action from '../Item';
import Label from '../../Inputs/Label';
import Gear from '../../SVG/Gear';
import styles from './index.module.css';

export default ({actions, selectedAction, setSelectedAction}) => (<>
  <div>
    <Label label="Device Actions" />
    <div className={styles.labelSubText}>
      (click on a parametized action <Gear className={styles.icon} /> to view values)
    </div>
  </div>
  <div className={styles.container}>
    {(actions && actions.length > 0) ? (
      actions.map((action, i) => <Action key={action.id} action={action} selectedAction={selectedAction} position={i+1} setSelectedAction={setSelectedAction} />)
    ) : (
      <div>No actions</div>
    )}
  </div>
</>)
