import React from 'react';
import uuid from 'uuid/v4';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import FormError from '@containers/FormError';
import FormContext from '@components/Form/Context';
import {Input} from '@components/Inputs';
import Polygon from '@components/SVG/PolygonH';
import SubmitButton from '@containers/SubmitButton'
import { procedureSchema } from '@utils/validation';
import { CREATE_PROCEDURE_REQUEST } from '@types/procedure';
import { getUserId } from '@selectors/auth';
import {getBusinessProceduresWithDevices} from '@selectors/business';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  placeholder: "Name",
  required: true
}, {
  type: "text",
  name: "description",
  placeholder: "Description",
  required: true
}]

export default ({match:{url,params:{oem_id,business_id}}}) => {
  const author = useSelector(getUserId)
  return(
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
          description: ''
        }}
        extraValues={{author, oem_business_id: business_id}}
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
          <SubmitButton formKey={formKey} onClick={handleSubmit} label="Continue" secondary />
        </>)}
      </FormContext>
      <div className={styles.bottomPolygonContainer}>
        <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
        <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
    </div>
  )
}
