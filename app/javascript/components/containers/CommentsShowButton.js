import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CommentsShowButton from '@components/Step/CommentsShowButton';
import {setModal, changeActiveFile} from '@actions/modal';

export default (props) => {
  const dispatch = useDispatch();
  const hasNewMess = true;
  const hasComments = true;
  const onClick = useCallback(e => {
    e.stopPropagation();
    dispatch(setModal('comments_list', {id: props.id, title: props.title}))
  });
  return <CommentsShowButton {...props} hasNewMess={hasNewMess} hasComments={hasComments} onClick={onClick} />
}
