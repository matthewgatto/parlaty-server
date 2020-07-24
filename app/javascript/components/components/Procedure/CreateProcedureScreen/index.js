import React from 'react';
import uuid from 'uuid/v4';
import { useFormContext } from "react-hook-form";
import {useSelector,useDispatch} from 'react-redux';
import FormError from '@containers/FormError';
import FormContext from '@components/Form/Context';
import {Input} from '@components/Inputs';
import Polygon from '@components/SVG/PolygonH';
import SubmitButton from '@containers/SubmitButton'
import CopyList from '../CopyList';
import withModal from '@containers/withModal';
import { procedureSchema } from '@utils/validation';
import { CREATE_PROCEDURE_REQUEST } from '@types/procedure';
import { getUserId } from '@selectors/auth';
import {getOemBusinessProceduresWithDevices} from '@selectors/oem_business';
import {setModal} from '@actions/modal';
import styles from './index.module.css';

const CopyModal = withModal(CopyList, "procedure_copy_list");

const CopyProcedureButton = ({formKey,oem_business_id}) => {
  const dispatch = useDispatch();
  const {getValues} = useFormContext();
  const handleClick = () => {
    const values = getValues();
    const errors = {};
    if(!values.name) errors.name = "This field is required";
    //if(!values.description) errors.description = "This field is required"
    if(Object.keys(errors).length > 0){
      dispatch({type: `CREATE_PROCEDURE_REQUEST__FAILURE`, payload: {formKey, errors:{fieldErrors: errors}}})
    } else {
      dispatch(setModal("procedure_copy_list", {formKey, values: {...values,oem_business_id}}))
    }
  }
  return(
    <button type="button" className="primary button align_center" onClick={handleClick}>Copy A Procedure</button>
  )
}
export default ({match:{url,params:{oem_id,oem_business_id}}}) => {
  const author = useSelector(getUserId)
  return(<>
    <div className={styles.container}>
      <div className={styles.topPolygonContainer}>
        <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
        <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
      <div className={styles.header}>Create A Procedure</div>
      <div className={styles.subheader}>Begin with a name and short description</div>
      <FormContext
        entity="create_procedure"
        url="/procedures"
        type={CREATE_PROCEDURE_REQUEST}
        initialValues={{
          name: '',
          description: '',
          language: '',
          version: 1
        }}
        extraValues={{author, oem_business_id,oem_id}}
        validationSchema={procedureSchema}
        className={styles.form}
        id={uuid()}
        submitOnEnter
      >
        {({handleSubmit, formKey}) => (<>
          <div className={styles.error}>
            <FormError formKey={formKey} />
          </div>
          <Input type="text" name="name" label="Name" formKey={formKey} as="input" />
          <Input as="textarea" label="Description" name="description" rows="6" formKey={formKey} />
          {/*<Input as="input" name="author" type="text" label="Author" formKey={formKey} />*/}
          <Input as="input" name="language" type="text" label="Language" formKey={formKey} />
          <Input as="input" name="version" type="number" label="Version" formKey={formKey} disabled/>
          <div className={styles.buttonRow}>
            <CopyProcedureButton formKey={formKey} oem_business_id={oem_business_id} />
            <div className={styles.or}>- or -</div>
            <SubmitButton formKey={formKey} onClick={handleSubmit} label="Continue" />
          </div>
        </>)}
      </FormContext>
      <div className={styles.bottomPolygonContainer}>
        <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
        <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
    </div>
    <CopyModal oem_business_id={oem_business_id} />
  </>)
}
