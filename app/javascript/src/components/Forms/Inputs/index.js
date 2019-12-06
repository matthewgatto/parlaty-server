import React from 'react';
import { Field as SlowField, FastField, useField } from 'formik';
import Error from '../../Error';
import Triangle from '../../SVG/Triangle';
import Close from '../../SVG/Close';
import Upload from '../../SVG/Upload';
import styles from './index.module.css';

function Field(props){
  return(
    <div className={props.meta.error ? styles.container+" invalidField" : styles.container}>
      <label htmlFor={props.name}>
        {props.label}
        <Error className={styles.error} error={props.meta.error} />
      </label>
      {props.children}
    </div>
  )
}


export function Input({label, ...props}){
    return(
      <FastField name={props.name} >
        {({field, meta}) => (
          <Field name={props.name} meta={meta} label={label}>
            <input {...field} {...props}  />
          </Field>
        )}
      </FastField>
    )
}

export function CheckBox({label, ...props}){
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return(
        <Field name={props.name} meta={meta} label={label}>
          <input type="checkbox" {...field} {...props}   />
        </Field>
    )
}

export function Radio({label, value, ...props}){
  return(
    <SlowField name={props.name}>
      {({ field, form, meta }) => (
        <Field name={props.name} meta={meta} label={label}>
          <input
            type="checkbox"
            {...props}
            checked={field.value === value}
            onChange={() => {
              form.setFieldValue(props.name, value)
            }}
          />
        </Field>
      )}
    </SlowField>
  )
}


export function Textarea({label, ...props}){
  return(
    <FastField name={props.name}>
      {({field, meta}) => (
        <Field name={props.name} meta={meta} label={label}>
          <textarea {...field} {...props}  />
        </Field>
      )}
    </FastField>
  )
}

function SelectField({label, options, meta, field, ...props}){
  return(
    <Field name={props.name} meta={meta} label={label}>
      <div className={styles.selectContainer}>
        <select {...field} {...props}>
          {(options && options.length > 0) ? (
            options.map(option =>
              <option key={option.value} value={option.value}>{option.label}</option>
            )
          ) : null}
        </select>
        <Triangle className={styles.selectIcon} />
      </div>
    </Field>
  )
}

export function Select(props){
  return(
    <FastField name={props.name}>
      {({field, meta}) => (
        <SelectField {...props} field={field} meta={meta} />
      )}
    </FastField>
  )
}

class PositionSelect extends React.PureComponent {
  componentDidMount(){
    this.props.setFieldValue(this.props.name, this.props.idx+1)
  }
  componentDidUpdate(prevProps){
    if(prevProps.idx != this.props.idx){
      this.props.setFieldValue(this.props.name, this.props.idx+1)
    }
  }
  render(){
    const { setFieldValue, idx, field, meta, ...props } = this.props;
    return(
      <SelectField {...props} field={field} meta={meta} />
    )
  }
}
export function PositionSelectContainer({steps, ...props}){
  const options = [{value: 1, label: "Number 1"}]
  for (var i = 2; i < steps + 1; i++) {
    options.push({value: i, label: "Number "+i})
  }
  return(
    <FastField name={props.name}>
      {({field, meta, form}) => (
        <PositionSelect {...props} options={options} field={field} meta={meta} setFieldValue={form.setFieldValue}  />
      )}
    </FastField>
  )
}
class FileInputComponent extends React.PureComponent {
  inputRef = React.createRef();
  handleChange = (e) => {
    this.props.setFieldValue(this.props.name, e.currentTarget.files[0]);
    e.target.value = null;
  }
  handleClick = () => {
    if(this.props.field.value){
      this.props.setFieldValue(this.props.name, null);
    } else {
      this.inputRef.current.click();
    }
  }
  render(){
    const { value } = this.props.field;
    var inputText = "Upload"
    if(value){
      inputText = value.name ? value.name : "File";
    }
    return(
      <div className={styles.fileInputContainer}>
        <label>{this.props.label}</label>
        <span className={styles.fileButton} onClick={this.handleClick}>
        <div className={styles.fileName}>{inputText}</div>
        {value ? (
          <Close className={styles.fileIcon} />
        ) : (
          <Upload className={styles.fileIcon} />
        )}
        </span>
        <input ref={this.inputRef} className={styles.hidden} name={this.props.name} type="file" onChange={this.handleChange} />
      </div>
    )
  }
}

export function FileInput({label, name}){
  return(
    <FastField name={name}>
      {({field, meta, form}) => (
        <Field name={name} meta={meta}>
          <FileInputComponent setFieldValue={form.setFieldValue} name={name} field={field} meta={meta} form={form} label={label} />
        </Field>
      )}
    </FastField>
  )
}
