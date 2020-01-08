import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';

export default (props) => {
  const isLoggedIn = useSelector(({auth}) => auth ? true : false);
  const dispatch = useDispatch()
  const onClick = () => dispatch(logout())
  if(isLoggedIn) return <Link to="/" onClick={onClick} {...props}>Logout</Link>
  return null
}
