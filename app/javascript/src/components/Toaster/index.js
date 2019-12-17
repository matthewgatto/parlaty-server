import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './index.module.css';

function Toast(props){
  var timer = setTimeout(closeToast, 8000);
  function closeToast(){
    props.close(props.toast.id)
    clearTimeout(timer)
  }
  function renderIcon(){
    if(props.toast.status == 'success'){
      return(
        <svg className={styles.statusIcon} viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      )
    }
    return(
      <svg className={styles.statusIcon} viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      </svg>
    )
  }
  function getColor(){
    switch (props.toast.status) {
      case 'success':
        return {"backgroundColor": "#70b771"}
        break;
      case 'error':
        return {"backgroundColor": "#ca5e58"}
        break;
    }
  }
  return(
    <span className={styles.container} style={getColor()} onClick={closeToast}>
      {renderIcon()}
      <div className={styles.message}>
        <div className={styles.text}>{props.toast.text}</div>
      </div>
    </span>
  )
}

export default function(props){
  return(
    <TransitionGroup className={styles.toastList}>
      {props.toasts.map(toast =>
        <CSSTransition
          key={toast.id}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exit,
            exitActive: styles.exitActive
          }}
          timeout={300}
          unmountOnExit
        >
          <Toast toast={toast} close={props.removeToast} />
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}
