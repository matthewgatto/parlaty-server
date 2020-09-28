import React,{useRef} from 'react';
import styles from './index.module.css';
import {useFormContext} from "react-hook-form";

export default ({rows, cols, limit, name, value, onChange}) => {
  const ref = useRef(null);
  const { setValue } = useFormContext();
  const setFormattedContent = e => setValue(name, e.target.value);
  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        {ref.current && ref.current.value.length || value && value.length || 0}{'/'}{limit}
      </div>
      <textarea
        maxLength={limit}
        ref={ref}
        name={name}
        rows={rows}
        cols={cols}
        onChange={e => onChange(e) || setFormattedContent(e)}
        defaultValue={value}
      />
    </div>
  )
}
