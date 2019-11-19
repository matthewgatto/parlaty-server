import React from 'react';
import {Select} from '../components/Inputs';

class PositionSelect extends React.PureComponent {
  render(){
    const options = [{value: 1, label: "Number 1"}]
    for (var i = 2; i < this.props.steps + 1; i++) {
      options.push({value: i, label: "Number "+i})
    }
    return(
      <Select {...this.props} options={options} />
    )
  }
}

export default PositionSelect;
