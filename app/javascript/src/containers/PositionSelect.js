import React from 'react';
import { connect } from 'react-redux';
import SelectField from '../components/SelectField';

class PositionSelect extends React.PureComponent {
  render(){
    return(
      <SelectField {...this.props} label="Number*" name="number" form="step" />
    )
  }
}

export default connect(
  ({procedure}) => {
    let options = [];
    for (var i = 1; i < procedure.steps.length + 2; i++) {
      options.push({value: i, label: "Number "+i})
    }
    return ({options})
  }
)(PositionSelect);
