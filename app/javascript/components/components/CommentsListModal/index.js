import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';
import {getCommentsList} from '@selectors/comments';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeRead, deleteComment } from '@actions/comments';

export default activeModal(({modalData}) => {
  const commentsList = useSelector(getCommentsList(modalData.id));
  const dispatch = useDispatch();
  const isDelete = id => {
    dispatch(deleteComment(id));
  };
  const isRead = id => {
    dispatch(makeRead(id));
  };
  // useEffect(() => {
  //   console.log("!!!", modalData, commentsList);
  // }, [commentsList]);
  return <div className={styles.container} >
            <div className={styles.header}>
              <span>{'Comments for '+modalData.title}</span>
            </div>
            <div className={styles.commentsWrap}>
              {commentsList && commentsList.map(comment =>
                <div key={comment.id} className={styles.commentBoxWrap} onMouseOut={() => {if(!comment.read)isRead(comment.id)}}>
                  <div className={styles.headerComment}>
                    <span>{comment.author}</span>
                    <span>{comment.created_at}</span>
                  </div>
                  <div className={styles.comment}>{comment.text}</div>
                  {!comment.read ? <ErrorOutlineIcon className={styles.indicate} fontSize="small" /> : null}
                  <div className={styles.deleteBtn} onClick={() => isDelete(comment.id)}>
                    <DeleteOutlineIcon fontSize="large"/>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.deleteAllWrap} >
              <ModalTrigger modal="delete_all_comments" modalData={modalData.id}><SubmitButton primary label="Delete all comments" /></ModalTrigger>
            </div>
           </div>
  }, "comments_list")
