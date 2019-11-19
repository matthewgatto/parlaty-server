import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function OEMItem(props){
  return(
    <Link to={`/oem/${props.id}`}>
      {props.oem.name}
    </Link>
  )
}

export default connect(
  ({entities}, {id}) => ({oem: entities.oems[id]})
)(OEMItem);
