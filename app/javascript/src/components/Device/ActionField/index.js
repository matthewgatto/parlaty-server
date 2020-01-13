import React from 'react';
import { Controller } from "react-hook-form";
import Close from '../../SVG/Close';
import Burger from '../../SVG/Burger';

export default ({id, idx, handleDeleteAction, setRef, defaultValue, dragHandleProps, draggableProps}) => {
  const name = `actions[${id}]`
  return(
    <div {...dragHandleProps} {...draggableProps} ref={setRef} className="action_input">
      <Burger className="action_input__burger" width="1.1em" height="1.1em" />
      <Controller defaultValue={defaultValue} type="text" name={name} as="input" />
      <Close onClick={() => {handleDeleteAction(idx)}} className="action_input__icon" />
    </div>
  )
}
