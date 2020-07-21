import React from 'react';
import {useSelector} from 'react-redux';
import {getOemBusinessById}from '@selectors/oem_business';
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
  const oem_business = useSelector(getOemBusinessById(id))
  return <CheckBox defaultValue={defaultValue && contains(defaultValue, id)} label={oem_business.name} name={id+""} />
}
