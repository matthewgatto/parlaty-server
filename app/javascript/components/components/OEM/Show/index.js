import React from 'react';
import {Link} from 'react-router-dom';
import ListPage from '@components/List/Page';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteClientConfirmationModal from '../DeleteConfirmationModal'
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import { getOEMBusinesses } from '@selectors/oem';

export default ({match:{url,params:{id}}}) => (<>
  <ListPage
    label="Categories"
    header={{
      header: {text: "", entityKey: "oems", id},
      back: {to: "/", label: "Home"},
      buttons: (<>
        <ModalTrigger modal="delete_client_confirmation"><SubmitButton primary label="Delete Client" /></ModalTrigger>
        <Link to={`${url}/edit`}><SubmitButton primary label="Edit Client" /></Link>
        <Link to={`${url}/businesses/create`}><SubmitButton primary label="Add Site" /></Link>
      </>)
    }}
    list={{
      id,
      type: FETCH_OEM_BUSINESSES_REQUEST,
      url: `${url}/oem_businesses`,
      text: "Categories",
      entityKey: "businesses",
      to: `${url}/businesses`,
      placeholder: "This client has no categories",
      selector: getOEMBusinesses(id)
    }}
  />
  <DeleteClientConfirmationModal client_id={id} />
</>)
