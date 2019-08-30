import { connect } from 'react-redux'
import ProcedureImages from '../components/ProcedureImages';
import { removeImage } from '../store/procedure';

export default connect(
  ({procedure}) => {
    let images = [];
    for (var i = 0; i < procedure.steps.length; i++) {
      if(procedure.steps[i].src){
        images.push({id: i, src: procedure.steps[i].src});
      }
    }
    return({images})
  },
  { removeImage }
)(ProcedureImages)
