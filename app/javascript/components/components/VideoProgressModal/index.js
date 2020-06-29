import React from 'react';
import styles from './index.module.css';
import Label from '@components/List/Label';
import withModal from '@containers/withModal';
import VideoProgressBar from '@containers/VideoProgressBar';

export default withModal(() => (
  <div className={styles.container}>
    <Label>Uploading Video</Label>
    <VideoProgressBar />
  </div>
), "video_progress")
