import TitleSection from "../../components/shared/TitleSection";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <section>
      <div>
        <TitleSection heading="Payment" subheading="check it out" />
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
