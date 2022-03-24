import React from 'react';
import useOemInfo from '@containers/useOemInfo';
import Label from '@components/List/Label';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import ModalOverlay from '@components/Modal/Overlay';
import styles from './index.module.css';

function getClientSecret(oem_id) {
  let paymentIntent = oem && oem.subscription && oem.subscription.payment_intent && oem.subscription.payment_intent.client_secret;
  if (paymentIntent) {
    return paymentIntent;
  } else {
    return null;
  }
}

export default ({ oem_id }) => {
  let oem = useOemInfo(oem_id);
  let oemStatus = oem && oem.subscription && oem.subscription.subscription_status && oem.subscription.subscription_status != "PENDING" ? oem.subscription.subscription_status : "INACTIVE";
  let subscriptionPlan = oem && oem.subscription && oem.subscription.plan && oem.subscription.plan.name ? oem.subscription.plan.nam : "No Plan Selected";
  let paymentLabel = oem && oem.source_id ? "Update Card" : "Add Card";
  let modalData = {clientSecret: "TESTING"};
  return (<>
    <Label>Subscription</Label>
    <div className={styles.container}>
      <div className={styles.fields}>
        <span className={styles.title}>Status:</span>
        <span className={styles.text}>{oemStatus}</span>
      </div>
      <div className={styles.fields}>
        <span className={styles.title}>Plan:</span>
        <span className={styles.text}>{subscriptionPlan}</span>
      </div>
      <ModalTrigger modal="show_stripe_element" modalData={modalData}><SubmitButton primary label={paymentLabel}/></ModalTrigger>

    </div>
  </>)
}

