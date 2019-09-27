import React from 'react';
import styles from './index.module.css';

const Text = ({className, color, children, ...rest}) => {
  let classStr = styles.container;
  if(color){
    if(color === "primary"){
      classStr += " "+styles.primary;
    } else if(color === "secondary"){
      classStr += " "+styles.secondary;
    }
  }
  if(className){
    classStr += " "+className
  }
  return(
    <div className={classStr} {...rest}>
      {children}
    </div>
  )
}

export default Text;
