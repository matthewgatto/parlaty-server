import React from 'react';
import { connect } from 'react-redux';
import { removeAction } from '../store/form';
import Close from '../components/SVG/Close';

class RemoveActionIcon extends React.PureComponent {
  handleClick = () => {
    this.props.removeAction(this.props.idx)
  }
  render(){
    let { removeAction, idx, ...rest } = this.props;
    return(
      <Close {...rest} onClick={this.handleClick} />
    )
  }
}

export default connect(
  null,
  { removeAction }
)(RemoveActionIcon);
