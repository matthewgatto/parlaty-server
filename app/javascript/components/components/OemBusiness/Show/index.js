import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import ListPage from '@components/List/Page';
import SubmitButton from '@components/SubmitButton';
import NotificationButton from '@components/NotificationButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteOemBusinessConfirmationModal from '../DeleteConfirmationModal'
import { FETCH_OEM_BUSINESS_PROCEDURES_REQUEST } from '@types/oem_business';
import { getOemBusinessProcedures, getOemIdByOemBusinessId, getOemBusinessById } from '@selectors/oem_business';
import ModalOverlay from '@components/Modal/Overlay';
import useOemInfo from '@containers/useOemInfo';
import styles from './index.module.css';

export default ({match:{params:{oem_business_id,oem_id},url}}) => {
  const id_oem = useSelector(getOemIdByOemBusinessId(oem_business_id)),
    oem = useOemInfo(oem_id || id_oem);

  const oemBusiness = useSelector(getOemBusinessById(oem_business_id));

  const procedures_limit = oem && oem.procedures_limit ? parseInt(oem.procedures_limit) : false
  const procedures_count = oem && oem.procedures_count ? parseInt(oem.procedures_count) : 0
  const limited = oem && procedures_limit && (procedures_limit - procedures_count <= 0);
  const labelCounter = procedures_limit ?
    `${procedures_count}/${procedures_limit}` : false
  const notifications = limited ?
    {
      disabled: true,
      info: '!',
    } :
    {
      disabled: false
    };

  function getHeader() {
    let businessName = oemBusiness && oemBusiness.name;
    if (businessName) {
      return `Site: ${businessName}`;
    } else {
      return 'Site';
    }
  }

  return (<>
    <ListPage
      label="Procedures"
      labelCounter={procedures_limit ? labelCounter : false}
      header={{
        header: {text: getHeader(), entityKey: "oem_businesses", oem_business_id},
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
    <ModalOverlay>
      <DeleteOemBusinessConfirmationModal oem_business_id={oem_business_id}/>
    </ModalOverlay>
  </>)
}
