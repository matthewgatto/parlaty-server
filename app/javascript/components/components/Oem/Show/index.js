import React from 'react';
import {Link} from 'react-router-dom';
import ListPage from '@components/List/Page';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteClientConfirmationModal from '../DeleteConfirmationModal'
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import { getOemBusinesses } from '@selectors/oem';
import ModalOverlay from '@components/Modal/Overlay';

export default ({match:{url,params:{oem_id}}}) => (<>
  <ListPage
    label="Sites"
    header={{
      header: {text: "", entityKey: "oems", oem_id},
      back: {to: "/", label: "Home"},
      buttons: (<>
        <ModalTrigger modal="delete_client_confirmation"><SubmitButton primary label="Delete Client" /></ModalTrigger>
        <Link to={`${url}/edit`}><SubmitButton primary label="Edit Client" /></Link>
        <Link to={`${url}/sites/create`}><SubmitButton primary label="Add Site" /></Link>
      </>)
    }}
    list={{
      oem_id,
      type: FETCH_OEM_BUSINESSES_REQUEST,
      url: `/oems/${oem_id}/oem_businesses`,
      text: "Sites",
      entityKey: "oem_businesses",
      to: `${url}/sites`,
      placeholder: "This client has no sites",
      selector: getOemBusinesses(oem_id)
    }}
  />
  <ModalOverlay>
    <DeleteClientConfirmationModal client_id={oem_id} />
  </ModalOverlay>
</>)
