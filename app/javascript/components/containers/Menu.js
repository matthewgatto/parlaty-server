import React from 'react';
import { connect } from 'react-redux';
import Menu from '@components/Form/Nested/Menu';

class MenuContainer extends React.Component {
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
    } else if(!this.props.disabled) {
      this.openMenu()
    }
  }
  handleDelete = (e) => {
    this.closeMenu();
    this.props.handleDeleteClick(e)
  }
  handleDuplicate = (e) => {
    this.closeMenu();
    this.props.handleDuplicateClick(e)
  }
  setRef = (e) => {this.containerRef = e;}
  render(){
    return(
      <Menu setRef={this.setRef} isOpen={this.state.isOpen} onClick={this.toggleMenu} handleDelete={this.handleDelete} handleDuplicate={this.handleDuplicate} />
    )
  }
}

export default MenuContainer;
