import React from 'react';
import { connect } from 'react-redux';
import StepMenu from '../components/StepMenu';

class StepMenuContainer extends React.Component {
  state = { isOpen: false }
  componentWillUnmount(){
    if(this.state.isOpen){
      document.removeEventListener('click', this.handleClickOutside, false);
    }
  }
  handleClickOutside = (e) => {
    if(this.containerRef.contains(e.target)){
      this.openMenu();
      return;
    }
    this.closeMenu();
  }
  closeMenu = () => {
    document.removeEventListener('click', this.handleClickOutside, false);
    this.setState({isOpen: false})
  }
  openMenu = () => {
    document.addEventListener('click', this.handleClickOutside, false);
    this.setState({isOpen: true})
  }
  toggleMenu = (e) => {
    e.stopPropagation();
    if(this.state.isOpen){
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }
  setRef = (e) => {this.containerRef = e;}
  render(){
    return(
      <StepMenu setRef={this.setRef} isOpen={this.state.isOpen} onClick={this.toggleMenu} handleDelete={this.props.deleteStep} handleDuplicate={this.props.duplicateStep} />
    )
  }
}

export default StepMenuContainer;
