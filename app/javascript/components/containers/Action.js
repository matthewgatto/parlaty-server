import React from 'react';
import { useSelector } from 'react-redux';
import Action from '@components/Action/Item';
import {getActionById} from '@selectors/action';
import {getStepValues} from '@selectors/template';

export default ({id, idx, ...props}) => {
  const action = useSelector(getActionById(id));
  const parent_id = action.parent_id;
  const parent = parent_id ? useSelector(getActionById(parent_id)) : undefined;
  const template = useSelector(getStepValues(idx));
  const actionValues = template && {
    parameter_value_8_pack: template[`actions[${id}].parameter_value_8_pack`],
    time: template[`actions[${id}].time`],
    mode: template[`actions[${id}].mode`],
  }
  return <Action {...props} action={action} parent={parent} actionValues={actionValues}/>
}
