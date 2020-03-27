import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Toast from '../Toast';
import styles from './index.module.css';

export default (props) => (
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
        <Toast toast={toast} handleRemove={props.handleRemove} />
      </CSSTransition>
    )}
  </TransitionGroup>
)
