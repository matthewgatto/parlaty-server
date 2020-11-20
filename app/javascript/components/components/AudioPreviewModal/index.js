import React from 'react';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';

export default activeModal(({modalData}) => (
  <div className={styles.container}>
    <div className={styles.icon}>
      <AudiotrackRoundedIcon fontSize="large" />
    </div>
    <audio key={modalData} className={styles.audio} autoPlay controls >
      <source src={modalData} />
    </audio>
  </div>
), "audio_preview");