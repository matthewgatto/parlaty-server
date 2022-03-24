import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import activeModal from '@containers/activeModal';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);


export default activeModal(({client_secret}) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: client_secret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CardElement />
      <button>Submit</button>
    </Elements>
  );
};