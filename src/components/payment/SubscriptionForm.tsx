import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export const SubscriptionForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // const { error, paymentMethod }
      //     = await stripe.createPaymentMethod({
      //         type: "card",
      //         card: cardElement,
      //     });
      // if (error) {
      //     setError(error.message);
      //     return;
      // }
      // const { id } = paymentMethod;
      // const response = await createSubscription({
      //     email: event.target.email.value,
      //     plan: event.target.plan.value,
      //     stripeToken: id,
      // });
      // if (response.error) {
      //     setError(response.error);
      //     return;
      // }
      // setSuccess(true);
    } catch (error) {
      // setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <select name="plan" required>
        <option value="plan_1">Plan 1</option>
        <option value="plan_2">Plan 2</option>
        <option value="plan_3">Plan 3</option>
      </select>
      <CardElement />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Subscription created!</p>}
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  );
};
