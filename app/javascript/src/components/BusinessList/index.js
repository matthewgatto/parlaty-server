import React from 'react';
import BusinessItem from '../../containers/BusinessItem';
import styles from './index.module.css';

const BusinessList = ({businesses}) =>
  <div className={styles.container}>
    {(businesses && businesses.length > 0) ? businesses.map(business =>
      <BusinessItem key={business} id={business} />
    ) : <div>No businesses</div>}
  </div>

export default BusinessList;
