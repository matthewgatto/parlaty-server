import {useSelector} from "react-redux";
import React from "react";
import styles from "./index.module.css";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {getCommentById} from '@selectors/comment';

export default ({commentId, isReaded, isDelete})=> {
  const comment = useSelector(getCommentById(commentId));
  return (
    <div key={comment.id} className={styles.commentBoxWrap} onMouseOut={() => {if(!comment.readed) isReaded(comment.id, comment.step_id)}}>
      <div className={styles.headerComment}>
        <span>{comment.author}</span>
        <span>{comment.created_at}</span>
      </div>
      <div className={styles.comment}>{comment.text}</div>
      {!comment.readed ? <ErrorOutlineIcon className={styles.indicate} fontSize="small" /> : null}
      <div className={styles.deleteBtn} onClick={() => isDelete(comment.id, comment.step_id)}>
        <DeleteOutlineIcon fontSize="large"/>
      </div>
    </div>
  );
}