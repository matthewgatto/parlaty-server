import React from 'react';
import { connect } from 'react-redux';
import SelectField from '../components/SelectField';

const OPTIONS = [{value: "1", label: "1 second"}, {value: "2", label: "2 seconds"}, {value: "3", label: "3 seconds"}, {value: "4", label: "4 seconds"}, {value: "5", label: "5 seconds"}, {value: "6", label: "6 seconds"}, {value: "7", label: "7 seconds"}, {value: "8", label: "8 seconds"}]

class DurationSelect extends React.PureComponent {
  render(){
    return(
      <SelectField {...this.props} label="Time*" name="time" form="step" options={OPTIONS} />
    )
  }
}

export default connect(
  ({procedure}) => ({steps: procedure.steps ? procedure.steps.length : 0})
)(DurationSelect);
