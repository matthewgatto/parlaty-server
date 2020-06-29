import React, {useRef,useEffect} from 'react';

export default (handleClick) => {
  const ref = useRef()
  useEffect(() => {
    const handleClickOutside = e => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handleClick()
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  },[handleClick,ref]);
  return ref
}
