import React, {useState} from 'react';
import {PaymentElement, CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import activeModal from '@containers/activeModal';
import ModalTrigger from '@containers/ModalTrigger';
import { useDispatch } from "react-redux";
import { setModal } from "@actions/modal";
import { addToast } from "@actions/toast";
import styles from "../../Modal/DeleteConfirmation/index.module.css";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const SetupForm = ({modalKey, onSuccess}) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()

    const [errorMessage, setErrorMessage] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const paymentLabel = modalKey.oem && modalKey.oem.source_id ? "Update Card" : "Add Card";

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        setErrorMessage("")
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            console.log('Stripe.js has not yet loaded.')
            return;
        }

        const {error} = await stripe.confirmSetup({
            //`Elements` instance that was used to create the Payment Element
            elements,
            redirect: "if_required"
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            console.error(error.message + '- error occurred during stripe confirm setup')
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            console.log('Stripe confirm succeeded')
            dispatch(addToast("success", paymentLabel + ' completed successfully.'));
            setDisabled(true);
            onSuccess && onSuccess()
            dispatch(setModal());
        }
        return
    }; // handleSubmit

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className={styles.buttons}>
              <button disabled={disabled} className="primary button align_center">{paymentLabel}</button>
            </div>
            {errorMessage && <div style={{marginTop: '0.25rem', color: '#df1b41', fontWeight: '400', fontSize: '1.93rem'}}>{errorMessage}</div>}
        </form>
    );
};

export default activeModal(({modalKey, onSuccess}) => {
    const options = {
        clientSecret: modalKey.clientSecret
    }
    return (
        <Elements stripe={stripePromise} options={options}>
      <SetupForm modalKey={modalKey} onSuccess={onSuccess}/>
    </Elements>
        );
}, "show_stripe_element")