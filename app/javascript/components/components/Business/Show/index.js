import React from 'react';
import {Link} from 'react-router-dom';
import ListPage from '@components/List/Page';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteCategoryConfirmationModal from '../DeleteConfirmationModal'
import { FETCH_BUSINESS_PROCEDURES_REQUEST } from '@types/oem_business';
import { getOemBusinessProcedures } from '@selectors/oem_business';

export default ({match:{params:{id,oem_id},url}}) => (<>
  <ListPage
    label="Procedures"
    header={{
      header: {text: "", entityKey: "oem_businesses", id},
      back: oem_id ? {to: `/oems/${oem_id}`, label: "Choose A Different Site"} : {to: "/", label: "Home"},
      buttons: (<>
        <ModalTrigger modal="delete_category_confirmation"><SubmitButton primary label="Delete Site" /></ModalTrigger>
        <Link to={`${url}/procedures/create`}><SubmitButton primary label="Add Procedure" /></Link>
      </>)
    }}
    list={{
      id,
      url: `/oem_businesses/${id}`,
      type: FETCH_BUSINESS_PROCEDURES_REQUEST,
      text: "Procedures",
      entityKey: "procedures",
      action: "update",
      placeholder: "This site has no procedures",
      selector: getOemBusinessProcedures(id),
      to: `${url}/procedures`
    }}
  />
  <DeleteCategoryConfirmationModal category_id={id} />
</>)
