import React from 'react';
import { connect } from 'react-redux';
import AddButton from '../components/AddButton';
import { openForm } from '../store/form';

class AddStepButton extends React.PureComponent {
  onClick = () => {
    this.props.openForm('step', 'create', null, {number: this.props.number, time: "8", playback: "continuous", skip: true})
  }
  render(){
    return(
      <AddButton text="Add Step" onClick={this.props.canAdd ? this.onClick : undefined} />
    )
  }
}

export default connect(
  ({form, procedure}) => ({canAdd: form.type !== "create", number: procedure.steps.length + 1}),
  { openForm }
)(AddStepButton);
