import React from 'react';
import { connect } from 'react-redux';
import ProcedureStep from '../components/ProcedureStep';
import { openForm } from '../store/form';

class ProcedureStepContainer extends React.Component {
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
  openForm = () => {
    this.props.openForm("step", "edit", this.props.step.id, this.props.step);
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
      <ProcedureStep setRef={this.setRef} idx={this.props.idx} isOpen={this.state.isOpen} openForm={this.props.formOpen ? undefined : this.openForm} toggleMenu={this.toggleMenu} step={this.props.step} />
    )
  }
}

export default connect(
  ({form}, {step}) => ({formOpen: form.id === step.id}),
  { openForm }
)(ProcedureStepContainer)
