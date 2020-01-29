import React from 'react';
import Burger from '../../../SVG/Burger';
import styles from './index.module.css';

export default ({handleDuplicate, handleDelete, onClick, isOpen, setRef}) => (
  <>
    <div onClick={onClick} className={styles.iconWrapper}>
      <Burger className={styles.burger} width="1.2em" height="1.2em" />
    </div>
    {isOpen &&
      <div ref={setRef} className={styles.container}>
        <div className={styles.link} onClick={handleDuplicate}>Duplicate</div>
        <div className={styles.link} onClick={handleDelete}>Delete</div>
      </div>
    }
  </>
)
