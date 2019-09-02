import React from 'react';
import styles from './index.module.css';

const StepMenu = ({handleDuplicate, handleDelete, onClick, isOpen, setRef}) =>
  <>
    <div onClick={onClick} className={styles.iconWrapper}>
      <svg className={styles.burger} width="1.2em" height="1.2em" viewBox="0 0 179 148">
        <line stroke="#000000" strokeWidth="10" x1="0" y1="5" x2="179" y2="5"/>
        <line stroke="#000000" strokeWidth="10" x1="0" y1="143" x2="179" y2="143"/>
        <line stroke="#000000" strokeWidth="10" x1="0" y1="74" x2="179" y2="74"/>
      </svg>
    </div>
    {isOpen &&
      <div ref={setRef} className={styles.container}>
        <div className={styles.link} onClick={handleDuplicate}>Duplicate</div>
        <div className={styles.link} onClick={handleDelete}>Delete</div>
      </div>
    }
  </>


export default StepMenu;
