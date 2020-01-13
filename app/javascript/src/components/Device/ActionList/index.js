import React from 'react';

export default ({actions}) => (
  <div className="device_select__action_list">
    {(actions && actions.length > 0) ? (
      actions.map((action, i) => (
        <div className="device_select__action_list__item" key={i}>
          <div className="device_select__action_list__item_number">{i+1}.</div>
          <div className="device_select__action_list__item_text">{action}</div>
        </div>
      ))
    ) : (
      <div>No actions</div>
    )}
  </div>
)
