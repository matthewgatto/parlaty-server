import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';
import {getCommentsList} from '@selectors/comment';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import Comment from '@components/Comment/Item';
import { makeReaded, deleteComment } from '@actions/comment';

export default activeModal(({modalData}) => {
  const commentsList = useSelector(getCommentsList(modalData.id));
  const dispatch = useDispatch();
  const isDelete = (params) => {

    dispatch(deleteComment(params));
  };
  const isReaded = (params) => {
    dispatch(makeReaded(params));
  };
  return <div className={styles.container} >
    <div className={styles.header}>
      <span>{'Comments for '+modalData.title}</span>
    </div>
    <div className={styles.commentsWrap}>
      {commentsList && commentsList.map(comment =>
        <Comment commentId={comment} procedureId={modalData.procedureId} isReaded={isReaded} isDelete={isDelete}/>
      )}
    </div>
    <div className={styles.deleteAllWrap} >
      <ModalTrigger modal="delete_all_comments" modalData={{stepId: modalData.id, commentIds: commentsList, procedureId: modalData.procedureId}}><SubmitButton primary label="Delete all comments" /></ModalTrigger>
    </div>
  </div>
}, "comments_list")
