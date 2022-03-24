import React from 'react';
import Label from '../Label';
import PageLayout from '@components/PageLayout';
import Content from '@components/Oem/Content';
import List from '@containers/List';

export default ({header, labelCounter, label, list, oem_id}) => (
  <PageLayout
    {...header}
  >
    {oem_id && <Content oem_id={oem_id}/>}
      <Label labelCounter = {labelCounter}>{label}</Label>
    <List {...list} />
  </PageLayout>
)
