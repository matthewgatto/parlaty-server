import { connect } from 'react-redux';
import Actions from '../components/Actions';
import { addAction, reorderAction } from '../store/form';

export default connect(
  ({form}) => {
    if(form.step.values.actions.length){
      let steps = [];
      for (var i = 1; i < form.step.values.actions.length + 1; i++) {
        steps.push(i+"")
      }
      return({steps})
    }
    return({steps: null})
  },
  { addAction, reorderAction }
)(Actions);
