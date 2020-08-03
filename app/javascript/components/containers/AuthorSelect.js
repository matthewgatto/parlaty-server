import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Select} from '@components/Inputs';
import {getOemBusinessById}from '@selectors/oem_business';
import { FETCH_OEM_BUSINESS_PROCEDURES_REQUEST } from '@types/oem_business';

export default ({formKey, defaultValue, oemBusinessId}) => {
  const dispatch = useDispatch();
  const oemBusiness = useSelector(getOemBusinessById(oemBusinessId))
  const authorsSelect = oemBusiness && oemBusiness.authors && oemBusiness.authors.map(author => ({value: author.id, label: author.name}))
  useEffect(() => {
    if(!oemBusiness){
      dispatch({type: FETCH_OEM_BUSINESS_PROCEDURES_REQUEST , payload: {url: `/oem_businesses/${oemBusinessId}`} })
    }
  },[oemBusiness]);
  return(
    <Select defaultValue={ defaultValue } options={authorsSelect || []} label="Author" name="author_id" formKey={formKey} placeholder="Choose an author..." unclearable />
  )
}
