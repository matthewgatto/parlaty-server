import React from 'react';
import {useSelector} from 'react-redux';
import {getBusinessById}from '@selectors/business';
import {CheckBox} from '@components/Inputs';

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}

export default ({id,defaultValue}) => {
  const business = useSelector(getBusinessById(id))
  return <CheckBox defaultValue={defaultValue && contains(defaultValue, id)} label={business.name} name={id+""} />
}
