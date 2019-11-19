import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ProcedureItem(props){
  return(
    <Link to={`/business/${props.business_id}/procedures/${props.id}/update`}>
      {props.procedure.name}
    </Link>
  )
}

export default connect(
  ({entities}, {id}) => ({procedure: entities.procedures[id]})
)(ProcedureItem);
