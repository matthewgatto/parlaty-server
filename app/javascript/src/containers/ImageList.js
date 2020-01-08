import React from 'react';
import { connect } from 'react-redux';
import Placeholder from '../components/Placeholder';
import ProcedureImage from './ProcedureImage';

const ImageList = ({images}) => images.length > 0 ? (
    images.map(image => <ProcedureImage key={image.id} image={image} />)
  ) : (
    <Placeholder text="This procedure currently has no images" />
  )

export default connect(
  ({steps}) => ({images:steps.images})
)(ImageList);
