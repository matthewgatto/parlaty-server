import React from 'react';
import Action from '../Item';
import Label from '../../Inputs/Label';
import Gear from '../../SVG/Gear';
import styles from './index.module.css';


export default ({actions, root, selectedAction, setSelectedAction}) => {
  const renderActionList = () => {
    if(actions){
      if(actions.length > 0){
        return actions.map((action, i) => <Action key={action.id} root={root} action={action} selectedAction={selectedAction} position={i+1} setSelectedAction={setSelectedAction} />)
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
