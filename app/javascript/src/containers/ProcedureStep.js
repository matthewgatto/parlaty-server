import React from 'react';
import { connect } from 'react-redux';
import ProcedureStep from '../components/ProcedureStep';

class ProcedureStepContaienr extends React.Component {
  state = { isOpen: false }
  componentWillUnmount(){
    if(this.state.isOpen){
      document.removeEventListener('click', this.handleClick, false);
    }
  }
  handleDragStart = (e) => {
    this.props.onDragStart(e, this.props.idx);
    this.closeMenu();
  }
  handleDragOver = () => {
    this.props.onDragOver(this.props.idx)
  }
  handleDragEnd = () => {
    this.props.onDragEnd(this.props.idx)
  }
  handleClick = (e) => {
    if(this.containerRef.contains(e.target)){
      this.openMenu();
      return;
    }
    this.closeMenu();
  }
  closeMenu = () => {
    document.removeEventListener('click', this.handleClick, false);
    this.setState({isOpen: false})
  }
  openMenu = () => {
    document.addEventListener('click', this.handleClick, false);
    this.setState({isOpen: true})
  }
  setRef = (e) => {this.containerRef = e;}
  render(){
    return(
      <ProcedureStep setRef={this.setRef} idx={this.props.idx} isOpen={true} onClick={this.handleClick} onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd} step={this.props.step} />
    )
  }
}

export default ProcedureStepContaienr
