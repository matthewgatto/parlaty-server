import React from 'react';
import Button,{Text} from '../Button';

export default ({onClick}) => (
  <Button light onClick={onClick}>
    <Text>Close</Text>
  </Button>
)
