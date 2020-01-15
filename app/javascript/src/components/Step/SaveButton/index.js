import React from 'react';
import Button,{Text} from '../Button';
import Loader from '../../Loader';

export default ({isProcessing, onClick}) => (
  <Button onClick={isProcessing ? undefined : onClick}>
    {isProcessing ? <Loader fill="#fff" /> : <Text>Save</Text>}
  </Button>
)
