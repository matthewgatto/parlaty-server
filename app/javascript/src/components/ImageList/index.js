import React from 'react';
import Placeholder from '../Placeholder';
import ProcedureImage from '../../containers/ProcedureImage';
import styles from './index.module.css';

export default function(props){
  if(props.images.length > 0) return(
    <div className={styles.list}>
      {props.images.map(image => <ProcedureImage key={image.id} image={image} />)}
    </div>
  )
  return <Placeholder text="This procedure currently has no images" />
}
