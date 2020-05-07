import React from 'react';
import ListPage from '@components/List/Page';
import PageLayout from '@components/PageLayout';
import UserList from '@containers/UserList';
import {allIds} from '@selectors/user';
import {FETCH_USERS_REQUEST} from '@types/user';

export default () => (
  <PageLayout header="Users" link={{to: '/users/invite', text: "Invite User"}}>
    <UserList />
  </PageLayout>
)
/*
export default () => (
  <ListPage
    header={{header: "Users", link: {to: '/users/invite', text: "Invite User"}}}
    list={{
      type: FETCH_USERS_REQUEST,
      url: '/users',
      text: "Users",
      entityKey: "users",
      to: '/users',
      placeholder: "There are no users",
      selector: allIds
    }}
  />
)
*/
