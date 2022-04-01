import React, { useState, useEffect } from "react";
import useOemInfo from '@containers/useOemInfo';
import Label from '@components/List/Label';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import ModalOverlay from '@components/Modal/Overlay';
import styles from './index.module.css';
import ShowStripeElementModal from "../ShowStripeElementModal";

export default ({oem_id}) => {
  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
    const localData = localStorage.getItem('login_data_4_16');
    if (localData) {
      let token = JSON.parse(localData).jwt
      const url = `/oems/${oem_id}/setup_intent`
      try {
        const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
        )
        const data = await response.json();
        setPosts(data);
      } catch (e) {
        console.error(`exception ${e} during fetch of ${url}`)
      }
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const clientSecret = posts && posts.setup_intent && posts.setup_intent.client_secret ?
      posts.setup_intent.client_secret : null
  let oem = useOemInfo(oem_id);
  let oemStatus = oem && oem.subscription && oem.subscription.subscription_status && oem.subscription.subscription_status != "PENDING" ? oem.subscription.subscription_status : "INACTIVE";
  let userCount = oem && oem.subscription && oem.subscription.user_count ? oem.subscription.user_count : 0;
  let subscriptionPlan = oem && oem.subscription && oem.subscription.plan && oem.subscription.plan.name ? oem.subscription.plan.nam : "No Plan Selected";
  let subscriptionPlans = oem && oem.subscription && oem.subscription.plans ? oem.subscription_plans : [];
  let paymentLabel = oem && oem.source_id ? "Update Card" : "Add Card";
  let planLabel = subscriptionPlan ? "Add Subscription" : "Update Subscription";
  let modalKey = {clientSecret: clientSecret};
  let modalPlans = {subscriptionPlans: subscriptionPlans};
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
      <div className={styles.fields}>
        <span className={styles.title}>Users:</span>
        <span className={styles.text}>{userCount}</span>
      </div>
      <div className={styles.flex}>
        <ModalTrigger modal="show_stripe_element">
          <SubmitButton primary className={styles.margins}
                        label={paymentLabel}/>
        </ModalTrigger>
      </div>
    </div>
    <ModalOverlay>
      <ShowStripeElementModal modalKey={modalKey}/>
    </ModalOverlay>
  </>)
}

