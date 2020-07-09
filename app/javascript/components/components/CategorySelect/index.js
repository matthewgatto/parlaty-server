import React from 'react';
import {LabelWrapper} from '@components/Inputs/Label';
import Loader from '@components/List/Loader';
import Category from '@containers/CategoryCheckbox';
import styles from './index.module.css';

export default ({categories,defaultValue}) => (<>
  <LabelWrapper>Sites</LabelWrapper>
  <div className={styles.checkboxes}>
    {categories ? (
      categories.map(id => <Category key={id} id={id} defaultValue={defaultValue} />)
    ) : (
      <Loader className={styles.loader} text="sites" />
    )}
  </div>
</>)
