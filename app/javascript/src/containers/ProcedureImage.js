import React from 'react';
import { connect } from 'react-redux';
import ProcedureImage from '../components/ProcedureImage';
import { useFormikContext} from 'formik';
import { removeImage } from '../redux/actions';

class ProcedureImageLoader extends React.PureComponent {
  state = {isLoading: true}
  imageRef = null;
  componentDidMount(){
    if(this.props.image && this.props.image.src){
      this.loadImage();
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.image && this.props.image.src && (!prevProps.image || !prevProps.image.src || prevProps.image.src !== this.props.image.src)){
      this.loadImage();
    }
  }
  loadImage = () => this.setState({isLoading: true, error: false}, this.makeImageRequest)
  makeImageRequest =() => {
    const img = new Image();
    img.src = this.imageRef.src;
    img.onload = this.handleImageLoad
    //img.onerror = reject
  }
  setImageRef = el => this.imageRef = el
  handleImageLoad = () => this.setState({isLoading: false})
  render(){
    return(
      <ProcedureImage isLoading={this.state.isLoading} onLoad={this.handleImageLoad} error={this.state.error} setImageRef={this.setImageRef} {...this.props} />
    )
  }
}

function ProcedureImageContainer(props){
  const {setFieldValue} = useFormikContext();
  const remove = () => {
    props.removeImage(props.image.id);
    setFieldValue(`steps.${props.image.idx}.image`, '');
  }
  return(
    <ProcedureImageLoader image={props.image} onClick={remove} />
  )
}

export default connect(
  null,
  {removeImage}
)(ProcedureImageContainer)
