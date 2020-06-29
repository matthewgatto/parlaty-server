import React from 'react';
import Label from '../Label';
import PageLayout from '@components/PageLayout';
import List from '@containers/List';

export default ({header, label, list}) => (
  <PageLayout
    {...header}
  >
    <Label>{label}</Label>
    <List {...list} />
  </PageLayout>
)
