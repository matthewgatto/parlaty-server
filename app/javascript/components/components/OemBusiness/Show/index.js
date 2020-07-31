import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import ListPage from '@components/List/Page';
import SubmitButton from '@components/SubmitButton';
import NotificationButton from '@components/NotificationButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteOemBusinessConfirmationModal from '../DeleteConfirmationModal'
import { FETCH_OEM_BUSINESS_PROCEDURES_REQUEST } from '@types/oem_business';
import { getOemBusinessProcedures, getOemIdByOemBusinessId } from '@selectors/oem_business';
import useOemInfo from '@containers/useOemInfo'
import styles from './index.module.css';

export default ({match:{params:{oem_business_id,oem_id},url}}) => {
  const id_oem = useSelector(getOemIdByOemBusinessId(oem_business_id)),
    oem = useOemInfo(oem_id || id_oem);
  console.log("oem_id: ", id_oem);

  const labelCounter = oem ?
      `${oem.procedures_count}/${oem.procedures_limit}` :
    null
  const limited = oem && oem.limited;
  const notifications = limited ?
    {
      disabled: true,
      info: '!',
    } :
    {
      disabled: false
    };
  console.log("notifications: ", notifications);
  return (<>
    <ListPage
      label="Procedures"
      labelCounter={labelCounter}
      header={{
        header: {text: "", entityKey: "oem_businesses", oem_business_id},
        back: oem_id ? {to: `/clients/${oem_id}`, label: "Choose A Different Site"} : {to: "/", label: "Home"},
        buttons: (<>
          <ModalTrigger modal="delete_oem_businesses_confirmation"><SubmitButton primary label="Delete Site"/></ModalTrigger>
          <Link to={ limited ? url : `${url}/procedures/create`} className={limited ? styles.notification : null} >
            { limited ?
              <NotificationButton primary notifications={notifications} label="Add Procedure"/> :
              <SubmitButton primary label="Add Procedure"/>
            }
          </Link>
        </>)
      }}
      list={{
        oem_business_id,
        url: `/oem_businesses/${oem_business_id}`,
        type: FETCH_OEM_BUSINESS_PROCEDURES_REQUEST,
        text: "Procedures",
        entityKey: "procedures",
        action: "update",
        placeholder: "This site has no procedures",
        selector: getOemBusinessProcedures(oem_business_id),
        to: `${url}/procedures`
      }}
    />
    <DeleteOemBusinessConfirmationModal oem_business_id={oem_business_id}/>
  </>)
}
