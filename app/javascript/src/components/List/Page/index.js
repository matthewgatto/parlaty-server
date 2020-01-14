import React from 'react';
import PageLayout from '../../PageLayout';
import List from '../../../containers/List';

export default ({header, label, list}) => (
  <PageLayout
    {...header}
  >
    <div className='list_label'>{label}</div>
    <List {...list} />
  </PageLayout>
)
