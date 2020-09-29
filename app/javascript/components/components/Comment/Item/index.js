import {useSelector} from "react-redux";
import React from "react";
import styles from "./index.module.css";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {getCommentById} from '@selectors/comment';

export default ({commentId, procedureId, isReaded, isDelete})=> {
  const comment = useSelector(getCommentById(commentId));
  return (
    <div key={comment.id} className={styles.commentBoxWrap} onMouseOut={() => {if(!comment.readed) isReaded({id: comment.id, stepId: comment.step_id, procedureId: procedureId})}}>
      <div className={styles.headerComment}>
        <span>{comment.author}</span>
        <span>{comment.created_at}</span>
      </div>
      <div className={styles.comment}>{comment.text}</div>
      {!comment.readed ? <ErrorOutlineIcon className={styles.indicate} fontSize="small" /> : null}
      { comment.readed ? (<div className={styles.deleteBtn} onClick={() => isDelete({id: comment.id, stepId: comment.step_id, procedureId: procedureId})}>
        <DeleteOutlineIcon fontSize="large"/>
      </div>) : null }
    </div>
  );
}