import React,{useState} from 'react';

export default WrappedComponent => props => {
  const [isToggled, setIsToggled] = useState();
  const handleToggle = () => setIsToggled(!isToggled);
  return (
    <WrappedComponent {...props} isToggled={isToggled} handleToggle={handleToggle} />
  )
}
