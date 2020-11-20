import React from 'react';
import styles from './index.module.css';
import Label from '@components/List/Label';
import activeModal from '@containers/activeModal';
import VideoProgressBar from '@containers/VideoProgressBar';

export default activeModal(() => (
    <div className={styles.container}>
      <Label>Uploading Media</Label>
      <VideoProgressBar />
    </div>
  ), "video_progress");
