import React from 'react';
import {useSelector} from 'react-redux';
import styles from './index.module.css';
import {getActionById} from '../../../redux/selectors/action';

export default ({position, id}) => {
  const {name} = useSelector(getActionById(id))
  return(
    <div className="align_center">
      <div className={styles.number}>{position}</div>
      <div className={styles.text}>{name}</div>
    </div>
  )
}
