import React from 'react';
import { connect } from 'react-redux';
import StepMenu from '@components/StepMenu';

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
    } else if(!this.props.isFormOpen) {
      this.openMenu()
    }
  }
  handleDeleteStep = (e) => {
    this.closeMenu();
    this.props.deleteStep(e)
  }
  handleDuplicateStep = (e) => {
    this.closeMenu();
    this.props.duplicateStep(e)
  }
  setRef = (e) => {this.containerRef = e;}
  render(){
    return(
      <StepMenu setRef={this.setRef} isOpen={this.state.isOpen} onClick={this.toggleMenu} handleDelete={this.handleDeleteStep} handleDuplicate={this.handleDuplicateStep} />
    )
  }
}

export default StepMenuContainer;
