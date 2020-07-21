import React from 'react';
import {LabelWrapper} from '@components/Inputs/Label';
import Loader from '@components/List/Loader';
import OemBusiness from '@containers/OemBusinessCheckbox';
import styles from './index.module.css';

export default ({oemBusinesses,defaultValue}) => (<>
  <LabelWrapper>Sites</LabelWrapper>
  <div className={styles.checkboxes}>
    {oemBusinesses ? (
      oemBusinesses.map(id => <OemBusiness key={id} id={id} defaultValue={defaultValue} />)
    ) : (
      <Loader className={styles.loader} text="sites" />
    )}
  </div>
</>)
