import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CommentsShowButton from '@components/Step/CommentsShowButton';
import {setModal, changeActiveFile} from '@actions/modal';

export default (props) => {
  const dispatch = useDispatch();
  const has_new_comments = props.has_new_comments || true;
  const hasComments = props.comments && props.comments.length || true;
  const onClick = useCallback(e => {
    e.stopPropagation();
    dispatch(setModal('comments_list', {id: props.id, title: props.title}))
  });
  return <CommentsShowButton {...props} has_new_comments={has_new_comments} hasComments={hasComments} onClick={onClick} />
}
