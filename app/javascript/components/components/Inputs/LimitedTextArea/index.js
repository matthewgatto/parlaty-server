import React,{useRef} from 'react';
import styles from './index.module.css';
import {useFormContext} from "react-hook-form";

export default ({rows, cols, limit, name, value}) => {
  const ref = useRef(null);
  const { setValue } = useFormContext();
  const setFormattedContent = text => {
    setValue(name, text);
  };

  return (
    <div>
      <div className={styles.counter}>
        {ref.current && ref.current.value.length || value.length}/{limit}
      </div>
      <textarea
        maxLength={limit}
        ref={ref}
        rows={rows}
        cols={cols}
        onChange={event => setFormattedContent(event.target.value)}
        defaultValue={value}
      />
    </div>
  )
}
