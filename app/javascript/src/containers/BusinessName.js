import React from 'react';
import { connect } from 'react-redux';
import { fetchEntity } from '../redux/actions';

function BusinessName({name}){
  if(name) return name
  return null
}
export default connect(
  ({entities}, {id}) => {
    const business = entities.businesses[id]
    return {
      name: business && business.name
    }
  },
  {fetchEntity}
)(BusinessName);
