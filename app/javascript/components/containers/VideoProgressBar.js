import React from 'react';
import {useSelector} from 'react-redux';
import VideoProgressBar from '@components/VideoProgressBar';

export default () => {
  const percent = useSelector(({progress}) => progress);
  return <VideoProgressBar percent={percent} />
}
