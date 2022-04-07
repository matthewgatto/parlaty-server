import React, {useCallback, useState} from 'react';
import activeModal from '@containers/activeModal';
import ModalTrigger from '@containers/ModalTrigger';
import styles from "./index.module.css"

const SetupForm = ({modalPlans}) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [subscriptionPlan, setSubscriptionPlan] = useState(modalPlans.subscriptionPlan)
    const [subscriptionPlanId, setSubscriptionPlanId] = useState(-1)
    const planLabel = modalPlans.subscription?.subscription_plan_id ? "Update Subscription" : "Add Subscription";

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        setErrorMessage("")
        setConfirmMessage("")
        //setConfirmMessage('Add Subscription completed successfully.');
        setDisabled(true);
        //modalPlans.subscriptionPlan = subscriptionPlan
        modalPlans.updateSubscriptionPlan(subscriptionPlan)
        const localData = localStorage.getItem('login_data_4_16');
        if (localData) {
            let token = JSON.parse(localData).jwt
            const url = `/oems/${modalPlans.oem_id}/update_subscription`
            console.log('*** about to post to url: ' + url + " subscriptionPlanId: " + subscriptionPlanId)
            //const body = {confirm_status: 0, subscription_plan_id: subscriptionPlanId, subscription: modalPlans.subscription}
            const body = {subscription: {confirm_status: "ACCEPTED", subscription_plan_id: subscriptionPlanId } }
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                    }
                )
                const data = await response.json();
                console.log(data)
                //setPosts(data);
            } catch (e) {
                console.error(`exception ${e} during fetch of ${url}`)
            }
        }
        return
    }; // handleSubmit
    const options=modalPlans.subscriptionPlans
    const label="Plan"
    const name="plan_id"
    const placeholder="Choose a plan..."
    const props = {}
    const selectOnChange = (event) => {
        if (event.target.value){
            setDisabled(false)
            setConfirmMessage("" )
            for (var i = 0; i < modalPlans.subscriptionPlans.length; i++) {
                if (modalPlans.subscriptionPlans[i].value == event.target.value) {
                    setConfirmMessage("Selected " + modalPlans.subscriptionPlans[i].label)
                    setSubscriptionPlan(modalPlans.subscriptionPlans[i].label)
                    setSubscriptionPlanId(modalPlans.subscriptionPlans[i].value)
                }
            }

        }
        else {
            setDisabled(true)
            setConfirmMessage("No plan selected")
            setSubscriptionPlan("No Plan Selected")
        }
    }
    //subscriptionPlanParm = "*** PLAN ****"
    return (<>
        <div className={styles.title}>Subscription Plans</div>
        <div className={styles.container}>
            <div className={styles.fields}>
                <span className={styles.label}>Plan</span>
                <span className={styles.text}>{subscriptionPlan}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.fields}>
                    <span className={styles.label}>Select a Plan</span>

                    <select className={styles.text}{...props} onChange={e => selectOnChange(e)}
                    >
                    {placeholder && <option value="" disabled={props.unclearable}>{placeholder}</option>}
                    {(options && options.length > 0) ? (
                        options.map(option =>
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    ) : null}
                    </select>
                </div>
                <div className={styles.buttons}>
                    <button disabled={disabled} className="primary button align_center">{planLabel}</button>
                    <ModalTrigger>
                        <button className="primary button align_center">Close</button>
                    </ModalTrigger>
                </div>
                {errorMessage && <div style={{marginTop: '0.25rem', color: '#df1b41', fontWeight: '400', fontSize: '1.93rem'}}>{errorMessage}</div>}
                {confirmMessage && <div style={{marginTop: '0.25rem', color: '#30b130', fontWeight: '400', fontSize: '1.93rem'}}>{confirmMessage}</div>}
            </form>
        </div>
        </>
    );
};

export default activeModal(({modalPlans}) => {
    return (
        <div className={styles.showSubscriptionsPlansModal}>
            <div className={styles.fields}>
                <SetupForm modalPlans={modalPlans} />
            </div>
        </div>

    );
}, "show_subscription_plans")