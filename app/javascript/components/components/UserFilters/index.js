import React,{useRef,useEffect} from 'react';
import withToggle from '@containers/withToggle';
import useHandleClickOutside from '@containers/useHandleClickOutside';
import styles from './index.module.css';

const ROLE_ARRAY = ["_all","ClientAdmin", "Author", "Operator"]
const ROLE_MAP = {
  ClientAdmin: "Client Admins",
  Author: "Authors",
  Operator: "Operators",
  _all: "All Roles"
}

const Dropdown = ({close, selection,setSelection}) => {
  const ref = useHandleClickOutside(close);
  return(
    <div className={styles.dropdown} ref={ref}>
      {ROLE_ARRAY.map(role => <div key={role} className={role === selection ? `${styles.role} ${styles.active}` : styles.role} onClick={() => {setSelection(role);close();}}>{ROLE_MAP[role]}</div>)}
    </div>
  )
}

const RoleDropdown = withToggle(({isToggled,handleToggle, selection, setSelection}) => (
  <div className={styles.roleDropdown}>
    <button type="button" className={styles.button} onClick={handleToggle}>
      <div className={styles.text}>{ROLE_MAP[selection]} <svg className={styles.icon} width="1em" height="1em" viewBox="0 0 50 50" >
        <polyline fill="none" stroke="#7b7979" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="45,10 25,30 5,10 "/>
      </svg></div>

    </button>
    {isToggled && <Dropdown close={handleToggle} selection={selection} setSelection={setSelection} />}
  </div>
))


export default ({textFilter, setTextFilter, roleFilter, setRoleFilter}) => (
  <div className={styles.container}>
    <div className={styles.inputWrapper}>
      <input type="text" value={textFilter} className={styles.input} onChange={e => {setTextFilter(e.target.value)}} placeholder="Search users..." />
      <svg fill="#7b7979" className={styles.searchIcon} viewBox="0 0 24 24" width="1.4em" height="1.4em"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
    <RoleDropdown selection={roleFilter} setSelection={setRoleFilter} />
  </div>
)
