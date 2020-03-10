import React from 'react';
import Action from '../Item';
import Label from '../../Inputs/Label';
import Gear from '../../SVG/Gear';
import styles from './index.module.css';


export default ({actions, root, formKey, defaultActions}) => {
  const renderActionList = () => {
    if(actions){
      if(actions.length > 0){
        return actions.map((action, i) => <Action key={action.id} formKey={formKey} root={root} defaultAction={(defaultActions && defaultActions[i] && defaultActions[i].id == action.id) ? defaultActions[i] : undefined} action={action} position={i+1} />)
      } else {
        return(<div>Selected device has no actions</div>)
      }
    }
    return(<div>No device selected</div>)
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
