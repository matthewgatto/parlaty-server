import { connect } from 'react-redux';
import ListItem from '../components/ListItem';

export default connect(
  ({entities}, {id, entityKey}) => ({name: entities[entityKey][id] ? entities[entityKey][id].name : undefined})
)(ListItem);
