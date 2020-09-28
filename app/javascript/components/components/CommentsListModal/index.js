import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';
import {getCommentsList} from '@selectors/step';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { commentRead, deleteComment } from '@actions/step';

export default activeModal(({modalData, step, ...props}) => {
  const commentsList = useSelector(getCommentsList(modalData.id));
  const dispatch = useDispatch();
  const deleteComment = useCallback((idx, comment_idx) => {
    dispatch(deleteComment(idx, comment_idx));
    console.log('delete', idx, comment_idx);
  }, []);
  const isRead = idx => {
    dispatch(commentRead(idx));
    console.log(commentsList[idx].read)
  };
  useEffect(() => {
    console.log("!!!", props, modalData, commentsList);
  }, [commentsList]);
  return <div className={styles.container} >
            <div className={styles.header}>
              <span>{'Comments for '+modalData.title}</span>
            </div>
            <div className={styles.commentsWrap}>
              {commentsList && commentsList.map((comment, idx) =>
                <div key={comment.id} className={styles.commentBoxWrap} onMouseOut={() => {if(!comment.read)isRead(idx)}}>
                  <div className={styles.headerComment}>
                    <span>{comment.author}</span>
                    <span>{comment.created_at}</span>
                  </div>
                  <div className={styles.comment}>{comment.text}</div>
                  {!comment.read ? <ErrorOutlineIcon className={styles.indicate} fontSize="small" /> : null}
                  <div className={styles.deleteBtn} onClick={() => deleteComment(idx, comment.idx)}>
                    <DeleteOutlineIcon fontSize="large"/>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.deleteAllWrap} >
              <ModalTrigger modal="delete_all_comments" modalData={idx}><SubmitButton primary label="Delete all comments" /></ModalTrigger>
            </div>
           </div>
  }, "comments_list")
