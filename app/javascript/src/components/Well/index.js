import React from 'react';
import styles from './index.module.css';

const Well = ({className, color, children, setRef, ...rest}) => {
  let classStr = styles.container;
  if(color){
    if(color === "primary"){
      classStr += " "+styles.primary
    }
  }
  if(className){
    classStr += " "+className
  }
  return(
    <div className={classStr} ref={setRef} {...rest}>
      {children}
    </div>
  )
}

export default Well;
