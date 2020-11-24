import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Input} from '@components/Inputs';
import {getOemBusinessById}from '@selectors/oem_business';
import { FETCH_OEM_BUSINESS_PROCEDURES_REQUEST } from '@types/oem_business';

export default ({formKey, defaultValue, oemBusinessId}) => {
  const dispatch = useDispatch();
  const oemBusiness = useSelector(getOemBusinessById(oemBusinessId))
  const authorsSelect = oemBusiness && oemBusiness.authors && oemBusiness.authors.map(author => ({value: author.id, label: author.name}))
  const authorValue = authorsSelect && (authorsSelect.some(e => e.value === defaultValue)) ? defaultValue : undefined;
  useEffect(() => {
    if(!oemBusiness){
      dispatch({type: FETCH_OEM_BUSINESS_PROCEDURES_REQUEST , payload: {url: `/oem_businesses/${oemBusinessId}`} })
    }
  },[oemBusiness]);
  return(
   <Input as="input" type="text" defaultValue={ authorValue } label="Author" name="author" formKey={formKey} />
  )
}
