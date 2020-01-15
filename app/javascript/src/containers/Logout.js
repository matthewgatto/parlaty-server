import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { isLoggedIn } from '../redux/selectors/auth';

export default (props) => {
  const loggedIn = useSelector(isLoggedIn);
  if(!loggedIn) return null
  const dispatch = useDispatch()
  const onClick = () => dispatch(logout())
  return <Link to="/" onClick={onClick} {...props}>Logout</Link>
}
