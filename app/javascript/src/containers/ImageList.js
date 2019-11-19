import ImageList from '../components/ImageList';
import { connect } from 'react-redux';

export default connect(
  ({form}) => ({images: form.images})
)(ImageList);
