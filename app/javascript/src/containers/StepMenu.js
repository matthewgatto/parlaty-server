import React from 'react';
import { connect } from 'react-redux';
import StepMenu from '../components/StepMenu';
import { deleteStep, duplicateStep } from '../store/procedure';

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
  handleDelete = (e) => {
    e.stopPropagation();
    this.props.deleteStep(this.props.idx)
  }
  handleDuplicate = (e) => {
    e.stopPropagation();
    this.props.duplicateStep(this.props.idx)
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
      <StepMenu setRef={this.setRef} isOpen={this.state.isOpen} onClick={this.toggleMenu} handleDelete={this.handleDelete} handleDuplicate={this.handleDuplicate} />
    )
  }
}

export default connect(
  null,
  { deleteStep, duplicateStep }
)(StepMenuContainer);
