import React from 'react';
import ProcedureImage from '../ProcedureImage';
import Placeholder from '../Placeholder';
import styles from './index.module.css';

const ProcedureImages = ({images, removeImage}) => images && images.length ? (
  <div className={styles.list}>
    {images.map(image => <ProcedureImage key={image.id} onClick={() => {removeImage(image.id)}} image={image.src} />)}
  </div>
) : <Placeholder text="This procedure currently has no images" />

export default ProcedureImages;
