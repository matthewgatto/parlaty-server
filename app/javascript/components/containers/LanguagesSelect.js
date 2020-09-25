import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Select} from '@components/Inputs';
import { FETCH_LANGUAGES_REQUEST } from '@types/language';
import { getLanguagesWithName } from '@selectors/language';

export default ({formKey, defaultValue}) => {
  const dispatch = useDispatch();
  const languages = useSelector(getLanguagesWithName)
  useEffect(() => {
    if(!languages){
      dispatch({type: FETCH_LANGUAGES_REQUEST, payload: {url: '/languages'}})
    }
  },[languages]);
  return(
    <Select defaultValue={ defaultValue } options={languages || []} label="Language" name="language_id" formKey={formKey} placeholder="Choose a language..." />
  )
}
