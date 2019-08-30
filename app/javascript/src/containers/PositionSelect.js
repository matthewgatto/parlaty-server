import React from 'react';
import { connect } from 'react-redux';
import SelectField from '../components/SelectField';

class PositionSelect extends React.PureComponent {
  options = null;
  makeOptions = () => {
    let options = [];
    for (var i = 1; i < this.props.steps + 2; i++) {
      options.push({value: i, label: "Number "+i})
    }
    this.options = options
  }
  render(){
    if(!this.options){
      this.makeOptions();
    }

    return(
      <SelectField {...this.props} label="Number*" name="number" form="step" options={this.options} />
    )
  }
}

export default connect(
  ({procedure}) => ({steps: procedure.steps ? procedure.steps.length : 0})
)(PositionSelect);
