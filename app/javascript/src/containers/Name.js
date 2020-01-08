import React from 'react';
import { useSelector } from 'react-redux';

export default ({id, entityKey}) => useSelector(({[entityKey]:{byId:{[id]:entity}}}) => entity ? entity.name : null)
