import React, {useRef,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form";
import Close from '@components/SVG/Close';
import Upload from '@components/SVG/Upload';
import {readFile} from '@utils';
import {setModal} from '@actions/modal';
import styles from './index.module.css';

const getInputText = (value) => {
  if(value){
    if(typeof value === 'string') return "File"
    if(typeof value.name === 'string') return value.name
  }
  return "Upload Image File"
}

class ImageDisplay extends React.Component {
  state = {isLoading: true, src: null};
  img = new Image();
  componentDidMount(){
    this.img.onload = () => this.setState({isLoading: false});
    this.setImageSrc()
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.src !== this.state.src){
      this.setState({isLoading: true}, () => {
        this.img.src = this.state.src;
      })
    } else if(prevProps.src !== this.props.src){
      this.setState({isLoading: true}, this.setImageSrc)
    }
  }
  openModal = () => this.props.setModal("image_preview", this.state.src)
  setImageSrc = async () => {
    var src = this.props.src;
    if(src instanceof File){
      src = await readFile(src);
    }
    this.setState({src})
  }
  setProps = () => {
    const props = {}
    if(this.state.isLoading){
      props.className = `${styles.imageContainer} ${styles.hide}`
    } else {
      props.onClick = this.openModal;
      props.className = styles.imageContainer;
      props.style = {backgroundImage: `url(${this.state.src})`}
    }
    return props
  }
  render(){
    return <div {...this.setProps()} />
  }
}

const ImageDisplayContainer = ({src, handleCloseIconClick,setModal,setFile}) => (
  <div className={styles.imageWrapper}>
    {src ? (<>
      <ImageDisplay src={src} setModal={setModal} />
      <div onClick={handleCloseIconClick} className={styles.iconWrapper}>
        <svg className={styles.closeIcon} fill="#fff" width="1em" height="1em" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    </>) : (<div onClick={setFile} className={styles.imagePlaceholder}>No Image Uploaded</div>)}
  </div>
)

export default ({label, name, initialValue, value, onChange}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { setValue } = useFormContext()
  const inputText = getInputText(value)
  const handleInputClick = () => {
    if(value){
      setValue(name, null);
      inputRef.current.value = null;
    } else {
      inputRef.current.click();
    }
  }
  const handleSetModal = (modal, data) => dispatch(setModal(modal,data))
  const handleImageIconClick = () => {
    setValue(name, null);
    inputRef.current.value = null;
  }
  useEffect(() => {
    if(!value){
      inputRef.current.value = null;
    }
  },[value])
  return(<>
    <label className={`${styles.label} align_center`}>{label}</label>
    <div className={styles.fileInputContainer}>
    <ImageDisplayContainer src={value} handleCloseIconClick={handleImageIconClick} setModal={handleSetModal} setFile={handleInputClick} />
    <div className={`${styles.container} align_center`} onClick={handleInputClick}>

      <span className={`button align_center ${styles.button}`}>
      <div className={styles.name}>{inputText}</div>
      {inputText === "Upload Image File" ? (
        <Upload className={styles.icon} />
      ) : (
        <Close className={styles.icon} />
      )}
      </span>
      <input ref={inputRef} className={styles.hidden} name={name} type="file" onChange={onChange} />
    </div>
    </div>
  </>)
}
