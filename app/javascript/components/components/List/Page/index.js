import React from 'react';
import Label from '../Label';
import PageLayout from '@components/PageLayout';
import List from '@containers/List';

export default ({header, labelCounter, label, list}) => (
  <PageLayout
    {...header}
  >
    <Label labelCounter = {labelCounter}>{label}</Label>
    <List {...list} />
  </PageLayout>
)
