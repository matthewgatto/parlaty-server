import React from 'react';
import { Link } from 'react-router-dom';
import DeviceManagerPage from '../DeviceManagerPage';
import SubmitButton from '@components/SubmitButton';
import styles from './index.module.css';

export default ({match:{params:{business_id,id}},location:{pathname}}) => (
  <DeviceManagerPage
    procedure_id={id}
    business_id={business_id}
    header="Add Procedure Devices"
    subheader="Add any devices that will be used throughout the procedure (you may always add devices later)"
    formComponents={<Link to={`${pathname.slice(0, -11)}add-steps`} className={styles.link}><SubmitButton label="Continue" secondary /></Link>}
  />
)
