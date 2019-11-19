import React from 'react';
import OEMItem from '../../containers/OEMItem';
import styles from './index.module.css';

const OEMList = ({oems}) =>
  <div className={styles.container}>
    {(oems && oems.length > 0) ? oems.map(oem =>
      <OEMItem key={oem} id={oem} />
    ) : <div>No oems</div>}
  </div>

export default OEMList;
