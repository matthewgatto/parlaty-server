import React from 'react';
import Action from '@containers/Action';
import Label from '../../Inputs/Label';
import Gear from '../../SVG/Gear';
import styles from './index.module.css';

export default ({actions, root, formKey}) => {
  const renderActionList = () => {
    if(actions){
      if(actions.length > 0){
        return actions.map((actionId, i) => <Action key={actionId} formKey={formKey} root={root} id={actionId} position={i+1} />)
      } else {
        return(<div className={styles.placeholder}>Selected device has no actions</div>)
      }
    }
    return(<div className={styles.placeholder}>No device selected</div>)
  }
  return(<>
    <div>
      <Label label="Device Actions" />
      <div className={styles.labelSubText}>
        (click on a parameterized action <Gear className={styles.icon} /> to edit values)
      </div>
    </div>
    <div className={styles.container}>
      {renderActionList()}
    </div>
  </>)
}
