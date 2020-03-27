import React from 'react';
import uuid from 'uuid/v4';
import {useSelector} from 'react-redux';
import PageLayout from '@components/PageLayout';
import FormError from '@containers/FormError';
import FormContext from '@components/Form/Context';
import DeviceComponent from '../Devices';
import {Input} from '@components/Inputs';
import SubmitButton from '@containers/SubmitButton'
import Name from '@containers/Name';
import { CREATE_PROCEDURE_REQUEST } from '@types/procedure';
import { getUserId } from '@selectors/auth';
import { procedureSchema } from '@utils/validation';
import styles from './index.module.css';

export default ({match:{params:{oem_id,business_id}}}) => {
  const author = useSelector(getUserId)
  return(
    <PageLayout
      header="New Procedure"
      back={business_id ? ({
        to: oem_id ? `/oems/${oem_id}/businesses/${business_id}` : `/businesses/${business_id}`,
        label: <Name entityKey="businesses" id={business_id} />
        }) : ({
          to: "/",
          label: "Home"
        })}
    >
      <FormContext
        entity="create_procedure"
        url="/procedures"
        type="THIS IS THE TYPE"
        initialValues={{
          name: '',
          description: ''
        }}
        extraValues={{author, oem_business_id: business_id}}
        validationSchema={procedureSchema}
        className={styles.content}
        id={uuid()}
      >
        {({handleSubmit, formKey}) => (<>
          <div>
            <div className={styles.margin}>
              <Input type="text" name="name" label="Name" formKey={formKey} as="input" />
              <Input as="textarea" label="Description" name="description" rows="6" formKey={formKey} />
            </div>
          </div>
          <div>
            <div className={styles.columnTitle}>Procedure Devices</div>
            <DeviceComponent />
            <span className={styles.createDevice}>Create A New Device</span>
            <SubmitButton formKey={formKey} onClick={handleSubmit} label="Continue" className={styles.submit} />
            <FormError formKey={formKey} large className={styles.error} />
          </div>
        </>)}
      </FormContext>
    </PageLayout>
  )
}
