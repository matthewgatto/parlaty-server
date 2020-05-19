import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FetchLoader from '@components/List/Loader';
import UserItem from '@components/User/Item';
import ListPlaceholder from '@components/List/Placeholder';
import UserFilters from '@components/UserFilters';
import {allIds} from '@selectors/user';
import {fetchUsers} from '@actions/user';


const FilteredList = ({users}) => {
  const [roleFilter, setRoleFilter] = useState("_all");
  const [textFilter, setTextFilter] = useState();
  const handleInputChange = (e) => setTextFilter(e.target.value)
  var filteredUsers = users;
  if(roleFilter && roleFilter !== "_all"){
    filteredUsers = filteredUsers.filter(user => user.roleable === roleFilter)
  }
  if(textFilter){
    const lcTextFilter = textFilter.toLowerCase();
    filteredUsers = filteredUsers.filter(user => ((user.name && user.name.toLowerCase().startsWith(lcTextFilter)) || (user.email && user.email.toLowerCase().startsWith(lcTextFilter))))
  }
  return(<>
    <UserFilters textFilter={textFilter} setTextFilter={setTextFilter} roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
    {filteredUsers.length > 0 ? (
      filteredUsers.map(user =>
        <UserItem key={user.id} user={user} />
      )
    ) : (
      <ListPlaceholder text="No matching users found" />
    )}
    </>)
}
export default function(props){
  const users = useSelector(({users}) => users.allIds && users.allIds.map(id => users.byId[id]));
  const dispatch = useDispatch();
  const fetchData = () => dispatch(fetchUsers());
  useEffect(() => {
    if(!users){
      fetchData()
    }
  },[]);
  if(!users) return <FetchLoader text="users" />
  if(users.length === 0) return <ListPlaceholder text="There are no users" />
  return <FilteredList users={users} />
}
