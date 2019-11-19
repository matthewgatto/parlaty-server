import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function BusinessItem(props){
  return(
    <Link to={`/business/${props.id}`}>
      {props.business.name}
    </Link>
  )
}

export default connect(
  ({entities}, {id}) => ({business: entities.businesses[id]})
)(BusinessItem);
